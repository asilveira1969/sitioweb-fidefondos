param(
    [string]$repo_path = ".",
    [string]$expected_branch = "main",
    [string]$expected_remote = "origin",
    [ValidateSet("static-web")]
    [string]$project_type = "static-web"
)

$ErrorActionPreference = "Stop"
$results = [System.Collections.Generic.List[object]]::new()
$hasCriticalFail = $false

function Add-Result {
    param(
        [string]$Check,
        [ValidateSet("PASS","WARN","FAIL")][string]$Status,
        [ValidateSet("Critical","Medium","Low")][string]$Severity,
        [string]$Message,
        [string]$Evidence = ""
    )

    $script:results.Add([pscustomobject]@{
        Check    = $Check
        Status   = $Status
        Severity = $Severity
        Message  = $Message
        Evidence = $Evidence
    })

    if ($Status -eq "FAIL" -and $Severity -eq "Critical") {
        $script:hasCriticalFail = $true
    }
}

function Run-Git {
    param([string[]]$GitArgs)
    try {
        $output = & git -c color.ui=false @GitArgs 2>&1
        return ($output | Out-String).Trim()
    }
    catch {
        return ""
    }
}

if (-not (Test-Path -LiteralPath $repo_path)) {
    Add-Result -Check "Repo path" -Status "FAIL" -Severity "Critical" -Message "Path does not exist." -Evidence $repo_path
    $results | Format-Table -AutoSize
    exit 1
}

Set-Location -LiteralPath $repo_path

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Add-Result -Check "Git availability" -Status "FAIL" -Severity "Critical" -Message "git is not installed or not in PATH."
    $results | Format-Table -AutoSize
    exit 1
}

if (-not (Test-Path -LiteralPath ".git")) {
    Add-Result -Check "Git repo" -Status "FAIL" -Severity "Critical" -Message "Current path is not a git repository." -Evidence (Get-Location).Path
    $results | Format-Table -AutoSize
    exit 1
}

Add-Result -Check "Repo path" -Status "PASS" -Severity "Critical" -Message "Valid git repository path." -Evidence (Get-Location).Path

$statusOutput = Run-Git @("status","--short","--branch")
if ([string]::IsNullOrWhiteSpace($statusOutput)) {
    Add-Result -Check "Git status" -Status "FAIL" -Severity "Critical" -Message "Could not read git status."
}
else {
    $firstStatus = ($statusOutput -split "`n")[0].Trim()
    Add-Result -Check "Git status" -Status "PASS" -Severity "Critical" -Message "Git status available." -Evidence $firstStatus

    if ($statusOutput -match "(?m)^( M|M |MM|A |D |R |C |\?\?)") {
        Add-Result -Check "Working tree cleanliness" -Status "WARN" -Severity "Medium" -Message "Working tree has pending changes." -Evidence "Commit or stash before migration handoff"
    }
    else {
        Add-Result -Check "Working tree cleanliness" -Status "PASS" -Severity "Medium" -Message "Working tree appears clean."
    }
}

$currentBranch = Run-Git @("rev-parse","--abbrev-ref","HEAD")
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
    Add-Result -Check "Expected branch" -Status "FAIL" -Severity "Critical" -Message "Could not detect current branch."
}
elseif ($currentBranch -eq $expected_branch) {
    Add-Result -Check "Expected branch" -Status "PASS" -Severity "Critical" -Message "Expected branch is active." -Evidence $currentBranch
}
else {
    Add-Result -Check "Expected branch" -Status "FAIL" -Severity "Critical" -Message "Unexpected active branch." -Evidence "Current=$currentBranch Expected=$expected_branch"
}

$upstream = Run-Git @("rev-parse","--abbrev-ref","--symbolic-full-name","@{u}")
if ([string]::IsNullOrWhiteSpace($upstream) -or $upstream -match "fatal") {
    Add-Result -Check "Tracking branch" -Status "FAIL" -Severity "Critical" -Message "No upstream tracking branch detected."
}
else {
    Add-Result -Check "Tracking branch" -Status "PASS" -Severity "Critical" -Message "Tracking branch detected." -Evidence $upstream
}

$remoteUrl = Run-Git @("remote","get-url",$expected_remote)
if ([string]::IsNullOrWhiteSpace($remoteUrl) -or $remoteUrl -match "fatal") {
    Add-Result -Check "Expected remote" -Status "FAIL" -Severity "Critical" -Message "Expected remote is missing." -Evidence $expected_remote
}
else {
    Add-Result -Check "Expected remote" -Status "PASS" -Severity "Critical" -Message "Expected remote configured." -Evidence "$expected_remote -> $remoteUrl"
}

$logOutput = Run-Git @("log","--oneline","-5")
if ([string]::IsNullOrWhiteSpace($logOutput)) {
    Add-Result -Check "Git history" -Status "WARN" -Severity "Medium" -Message "No recent commits found or log unavailable."
}
else {
    Add-Result -Check "Git history" -Status "PASS" -Severity "Medium" -Message "Recent commits available." -Evidence (($logOutput -split "`n")[0].Trim())
}

if ($project_type -eq "static-web") {
    $required = @("index.html","main.js","strategies.html","portfolio.html","about.html","README.md","resources")
    $missing = @()
    foreach ($item in $required) {
        if (-not (Test-Path -LiteralPath $item)) {
            $missing += $item
        }
    }

    if ($missing.Count -eq 0) {
        Add-Result -Check "Core files" -Status "PASS" -Severity "Critical" -Message "All required static-web files found." -Evidence ($required -join ", ")
    }
    else {
        Add-Result -Check "Core files" -Status "FAIL" -Severity "Critical" -Message "Missing required files/directories." -Evidence ($missing -join ", ")
    }
}

$cdnTokens = @("tailwindcss.com","animejs","echarts","chart.js","typed.js")
$scanFiles = @("index.html","strategies.html","portfolio.html","about.html","main.js","README.md") | Where-Object { Test-Path -LiteralPath $_ }
$allText = ""
foreach ($file in $scanFiles) {
    $allText += [Environment]::NewLine + (Get-Content -LiteralPath $file -Raw)
}

$missingCdn = @()
foreach ($token in $cdnTokens) {
    if ($allText -notmatch [regex]::Escape($token)) {
        $missingCdn += $token
    }
}

if ($missingCdn.Count -eq 0) {
    Add-Result -Check "CDN references" -Status "PASS" -Severity "Medium" -Message "Expected CDN references detected." -Evidence ($cdnTokens -join ", ")
}
else {
    Add-Result -Check "CDN references" -Status "WARN" -Severity "Medium" -Message "Some expected CDN references are missing." -Evidence ($missingCdn -join ", ")
}

$encodingWarnings = @()
$badChars = @([char]0x00C3, [char]0x00C2, [char]0x00E2, [char]0x00F0, [char]0xFFFD)
foreach ($file in @("README.md","design.md","outline.md") | Where-Object { Test-Path -LiteralPath $_ }) {
    $txt = Get-Content -LiteralPath $file -Raw
    $hasBadChar = $false
    foreach ($ch in $badChars) {
        if ($txt.Contains([string]$ch)) {
            $hasBadChar = $true
            break
        }
    }
    if ($hasBadChar) {
        $encodingWarnings += $file
    }
}

if ($encodingWarnings.Count -gt 0) {
    Add-Result -Check "Encoding quality" -Status "WARN" -Severity "Medium" -Message "Possible mojibake detected." -Evidence ($encodingWarnings -join ", ")
}
else {
    Add-Result -Check "Encoding quality" -Status "PASS" -Severity "Medium" -Message "No obvious mojibake patterns found."
}

if (Test-Path -LiteralPath ".github/workflows") {
    Add-Result -Check "Deploy workflow config" -Status "PASS" -Severity "Low" -Message "Workflow directory exists." -Evidence ".github/workflows"
}
else {
    Add-Result -Check "Deploy workflow config" -Status "WARN" -Severity "Low" -Message "No workflow directory found. This is acceptable for manual deploy models."
}

Add-Result -Check "Manual functional validation" -Status "WARN" -Severity "Critical" -Message "Browser checks are required and cannot be fully validated by this script." -Evidence "Run Phase D manually"
Add-Result -Check "Push continuity" -Status "WARN" -Severity "Critical" -Message "Push test not executed by default in non-destructive mode." -Evidence "Run git push --dry-run or real push"

Write-Host ""
Write-Host "Migration Verification Summary" -ForegroundColor Cyan
$results | Format-Table -AutoSize

$totals = $results | Group-Object Status | Sort-Object Name
Write-Host ""
Write-Host "Counts:" -ForegroundColor Cyan
foreach ($t in $totals) {
    Write-Host ("- {0}: {1}" -f $t.Name, $t.Count)
}

if ($hasCriticalFail) {
    Write-Host ""
    Write-Host "Exit code: 1 (critical failures found)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Exit code: 0 (essential checks passed or warnings only)" -ForegroundColor Green
exit 0
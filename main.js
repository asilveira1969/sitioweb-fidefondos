// DeFi Invest Pro - Main JavaScript File
// Comprehensive functionality for all interactive components

// Global variables
let currentQuestionIndex = 0;
let riskAssessmentScore = 0;
let selectedNetwork = 'base';
let currentPortfolioNetwork = 'all';

// Risk Assessment Questions
const riskQuestions = [
    {
        question: "What is your investment experience level?",
        options: [
            { text: "Beginner - New to investing", value: 1 },
            { text: "Intermediate - Some experience", value: 2 },
            { text: "Advanced - Experienced investor", value: 3 },
            { text: "Expert - Professional background", value: 4 }
        ]
    },
    {
        question: "What is your risk tolerance for investments?",
        options: [
            { text: "Very Conservative - Capital preservation", value: 1 },
            { text: "Conservative - Minimal risk", value: 2 },
            { text: "Moderate - Balanced approach", value: 3 },
            { text: "Aggressive - High risk tolerance", value: 4 }
        ]
    },
    {
        question: "What is your investment timeline?",
        options: [
            { text: "Short-term (less than 1 year)", value: 1 },
            { text: "Medium-term (1-3 years)", value: 2 },
            { text: "Long-term (3-5 years)", value: 3 },
            { text: "Very long-term (5+ years)", value: 4 }
        ]
    },
    {
        question: "How familiar are you with DeFi protocols?",
        options: [
            { text: "Not familiar at all", value: 1 },
            { text: "Basic understanding", value: 2 },
            { text: "Moderately familiar", value: 3 },
            { text: "Very experienced", value: 4 }
        ]
    },
    {
        question: "What percentage of your portfolio is in crypto?",
        options: [
            { text: "Less than 10%", value: 1 },
            { text: "10-25%", value: 2 },
            { text: "25-50%", value: 3 },
            { text: "More than 50%", value: 4 }
        ]
    },
    {
        question: "How would you react to a 20% portfolio decline?",
        options: [
            { text: "Sell immediately", value: 1 },
            { text: "Reduce positions", value: 2 },
            { text: "Hold and wait", value: 3 },
            { text: "Buy more at lower prices", value: 4 }
        ]
    },
    {
        question: "What is your primary investment goal?",
        options: [
            { text: "Capital preservation", value: 1 },
            { text: "Steady income generation", value: 2 },
            { text: "Balanced growth", value: 3 },
            { text: "Maximum capital appreciation", value: 4 }
        ]
    },
    {
        question: "How much time can you dedicate to monitoring investments?",
        options: [
            { text: "None - prefer passive approach", value: 1 },
            { text: "Occasional check-ins", value: 2 },
            { text: "Weekly monitoring", value: 3 },
            { text: "Daily active management", value: 4 }
        ]
    }
];

// Vault data for strategies page
const vaultData = {
    base: [
        {
            name: "Aerodrome USDC/DAI",
            protocol: "Aerodrome",
            apy: "12.5%",
            tvl: "$45.2M",
            risk: "low",
            network: "base",
            impermanentLoss: "Minimal",
            fees: "0.05%"
        },
        {
            name: "Uniswap ETH/USDC",
            protocol: "Uniswap",
            apy: "18.3%",
            tvl: "$32.8M",
            risk: "medium",
            network: "base",
            impermanentLoss: "Low",
            fees: "0.3%"
        },
        {
            name: "Aave USDC Lending",
            protocol: "Aave",
            apy: "8.7%",
            tvl: "$28.5M",
            risk: "low",
            network: "base",
            impermanentLoss: "None",
            fees: "0.01%"
        },
        {
            name: "Moonwell WBTC Lending",
            protocol: "Moonwell",
            apy: "6.2%",
            tvl: "$15.3M",
            risk: "medium",
            network: "base",
            impermanentLoss: "None",
            fees: "0.02%"
        }
    ],
    arbitrum: [
        {
            name: "Uniswap ARB/ETH",
            protocol: "Uniswap",
            apy: "22.1%",
            tvl: "$38.7M",
            risk: "high",
            network: "arbitrum",
            impermanentLoss: "Medium",
            fees: "0.3%"
        },
        {
            name: "Aave USDT Lending",
            protocol: "Aave",
            apy: "9.4%",
            tvl: "$42.1M",
            risk: "low",
            network: "arbitrum",
            impermanentLoss: "None",
            fees: "0.01%"
        },
        {
            name: "SushiSwap ETH/USDC",
            protocol: "SushiSwap",
            apy: "15.8%",
            tvl: "$25.4M",
            risk: "medium",
            network: "arbitrum",
            impermanentLoss: "Low",
            fees: "0.25%"
        }
    ],
    solana: [
        {
            name: "Orca SOL/USDC",
            protocol: "Orca",
            apy: "28.3%",
            tvl: "$18.9M",
            risk: "high",
            network: "solana",
            impermanentLoss: "High",
            fees: "0.25%"
        },
        {
            name: "Raydium RAY/USDC",
            protocol: "Raydium",
            apy: "31.7%",
            tvl: "$12.6M",
            risk: "high",
            network: "solana",
            impermanentLoss: "High",
            fees: "0.25%"
        },
        {
            name: "Marinade SOL Staking",
            protocol: "Marinade",
            apy: "7.2%",
            tvl: "$156.3M",
            risk: "low",
            network: "solana",
            impermanentLoss: "None",
            fees: "0.01%"
        }
    ],
    bnb: [
        {
            name: "PancakeSwap BNB/BUSD",
            protocol: "PancakeSwap",
            apy: "14.6%",
            tvl: "$67.2M",
            risk: "medium",
            network: "bnb",
            impermanentLoss: "Low",
            fees: "0.25%"
        },
        {
            name: "Venus USDC Lending",
            protocol: "Venus",
            apy: "11.3%",
            tvl: "$89.4M",
            risk: "medium",
            network: "bnb",
            impermanentLoss: "None",
            fees: "0.02%"
        }
    ]
};

// Portfolio positions data
const portfolioPositions = [
    {
        protocol: "Aerodrome",
        network: "base",
        value: "$45,230",
        apy: "12.5%",
        pnl: "+$3,420",
        risk: "low",
        protocolLogo: "https://kimi-web-img.moonshot.cn/img/blog.mevx.io/1beb2da16d9176ef79ceeea18db1a3880caf0c3c.jpg"
    },
    {
        protocol: "Uniswap",
        network: "arbitrum",
        value: "$32,180",
        apy: "18.3%",
        pnl: "+$5,670",
        risk: "medium",
        protocolLogo: "https://kimi-web-img.moonshot.cn/img/vectorseek.com/5c86cf590da6bd341350ca73a338d42c92b17b2c.jpg"
    },
    {
        protocol: "Aave",
        network: "base",
        value: "$28,950",
        apy: "8.7%",
        pnl: "+$1,240",
        risk: "low",
        protocolLogo: "https://kimi-web-img.moonshot.cn/img/blockzeit.com/f015ad014b05b0163df08478fea988d2b9f5b48f.png"
    },
    {
        protocol: "Orca",
        network: "solana",
        value: "$21,340",
        apy: "28.3%",
        pnl: "+$8,920",
        risk: "high",
        protocolLogo: "https://kimi-web-img.moonshot.cn/img/static.tildacdn.net/c4c203806e767fed27b9a68a541876a834666a5f.png"
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    initializeAnimations();
});

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initializeHomePage();
            break;
        case 'strategies.html':
            initializeStrategiesPage();
            break;
        case 'portfolio.html':
            initializePortfolioPage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
    }
}

// Initialize home page
function initializeHomePage() {
    // Initialize typed text effect
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Professional DeFi Management',
                'Maximize Your Returns',
                'Expert Risk Management',
                'Multi-Chain Strategies'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Animate counters
    animateCounters();
    
    // Initialize particle background
    initializeParticleBackground();
}

// Initialize strategies page
function initializeStrategiesPage() {
    // Initialize ROI calculator
    updateROICalculator();
    
    // Load vault data
    loadVaultData();
    
    // Initialize risk-reward chart
    initializeRiskRewardChart();
}

// Initialize portfolio page
function initializePortfolioPage() {
    // Load portfolio positions
    loadPortfolioPositions();
    
    // Initialize charts
    initializePortfolioCharts();
}

// Initialize about page
function initializeAboutPage() {
    // Animate statistics
    animateAboutStats();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // ROI Calculator inputs
    const investmentAmount = document.getElementById('investment-amount');
    const timeHorizon = document.getElementById('time-horizon');
    const riskProfile = document.getElementById('risk-profile');
    
    if (investmentAmount) {
        investmentAmount.addEventListener('input', updateROICalculator);
    }
    if (timeHorizon) {
        timeHorizon.addEventListener('change', updateROICalculator);
    }
    if (riskProfile) {
        riskProfile.addEventListener('change', updateROICalculator);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Risk Assessment Functions
function startRiskAssessment() {
    const modal = document.getElementById('risk-modal');
    if (modal) {
        modal.classList.remove('hidden');
        currentQuestionIndex = 0;
        riskAssessmentScore = 0;
        loadQuestion();
    }
}

function closeRiskAssessment() {
    const modal = document.getElementById('risk-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestionSpan = document.getElementById('current-question');
    const progressBar = document.getElementById('progress-bar');
    
    if (!questionContainer || currentQuestionIndex >= riskQuestions.length) {
        showAssessmentResults();
        return;
    }
    
    const question = riskQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / riskQuestions.length) * 100;
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
    }
    
    let html = `
        <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
            <div class="space-y-3">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button onclick="selectAnswer(${option.value})" 
                    class="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-all duration-300">
                ${option.text}
            </button>
        `;
    });
    
    html += '</div></div>';
    questionContainer.innerHTML = html;
}

function selectAnswer(value) {
    riskAssessmentScore += value;
    currentQuestionIndex++;
    
    // Add animation before loading next question
    anime({
        targets: '#question-container',
        opacity: [1, 0],
        duration: 300,
        complete: function() {
            loadQuestion();
            anime({
                targets: '#question-container',
                opacity: [0, 1],
                duration: 300
            });
        }
    });
}

function showAssessmentResults() {
    const questionContainer = document.getElementById('question-container');
    const resultsContainer = document.getElementById('assessment-results');
    
    if (!questionContainer || !resultsContainer) return;
    
    // Calculate risk profile
    const maxScore = riskQuestions.length * 4;
    const scorePercentage = (riskAssessmentScore / maxScore) * 100;
    
    let riskLevel, recommendedStrategy, projectedReturns;
    
    if (scorePercentage <= 40) {
        riskLevel = "Conservative";
        recommendedStrategy = "We recommend focusing on stablecoin pairs and established lending protocols with minimal impermanent loss risk.";
        projectedReturns = "Expected annual yield: 8-12% with capital preservation as primary goal.";
    } else if (scorePercentage <= 70) {
        riskLevel = "Balanced";
        recommendedStrategy = "A balanced approach mixing stablecoin pools with moderate-risk liquidity provision across multiple chains.";
        projectedReturns = "Expected annual yield: 12-18% with managed risk exposure.";
    } else {
        riskLevel = "Aggressive";
        recommendedStrategy = "High-yield strategies including volatile asset pairs and emerging protocols with active management.";
        projectedReturns = "Expected annual yield: 18-35% with higher risk tolerance.";
    }
    
    // Update results display
    document.getElementById('risk-score').textContent = Math.round(scorePercentage);
    document.getElementById('risk-level').textContent = riskLevel + ' Risk';
    document.getElementById('recommended-strategy').textContent = recommendedStrategy;
    document.getElementById('projected-returns').textContent = projectedReturns;
    
    // Hide questions and show results
    questionContainer.style.display = 'none';
    resultsContainer.classList.remove('hidden');
    
    // Animate results
    anime({
        targets: '#assessment-results',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutQuart'
    });
}

// ROI Calculator Functions
function updateROICalculator() {
    const amount = parseFloat(document.getElementById('investment-amount')?.value) || 10000;
    const time = parseInt(document.getElementById('time-horizon')?.value) || 12;
    const risk = document.getElementById('risk-profile')?.value || 'medium';
    
    let apyRange;
    switch(risk) {
        case 'low':
            apyRange = { min: 8, max: 12 };
            break;
        case 'high':
            apyRange = { min: 18, max: 35 };
            break;
        default:
            apyRange = { min: 12, max: 18 };
    }
    
    const avgApy = (apyRange.min + apyRange.max) / 2;
    const monthlyRate = avgApy / 100 / 12;
    const finalValue = amount * Math.pow(1 + monthlyRate, time);
    const totalGain = finalValue - amount;
    
    // Update display
    document.getElementById('initial-investment').textContent = `$${amount.toLocaleString()}`;
    document.getElementById('expected-apy').textContent = `${avgApy.toFixed(1)}%`;
    document.getElementById('time-period').textContent = `${time} months`;
    document.getElementById('final-value').textContent = `$${Math.round(finalValue).toLocaleString()}`;
    document.getElementById('total-gain').textContent = `$${Math.round(totalGain).toLocaleString()}`;
    
    // Update risk bar
    const riskBar = document.getElementById('risk-bar');
    if (riskBar) {
        const riskPercentage = risk === 'low' ? 30 : risk === 'high' ? 80 : 60;
        const riskColor = risk === 'low' ? '#28A745' : risk === 'high' ? '#DC2626' : '#FFC107';
        riskBar.style.width = riskPercentage + '%';
        riskBar.style.background = `linear-gradient(90deg, ${riskColor} 0%, #4A90E2 100%)`;
    }
}

function selectNetwork(network) {
    selectedNetwork = network;
    
    // Update active tab
    document.querySelectorAll('.network-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`network-${network}`)?.classList.add('active');
    
    // Load vault data for selected network
    loadVaultData();
}

function loadVaultData() {
    const container = document.getElementById('vaults-container');
    if (!container) return;
    
    const vaults = vaultData[selectedNetwork] || [];
    
    let html = '';
    vaults.forEach(vault => {
        const riskClass = `risk-${vault.risk}`;
        const riskColor = vault.risk === 'low' ? 'text-green-400' : 
                         vault.risk === 'medium' ? 'text-yellow-400' : 'text-red-400';
        
        html += `
            <div class="vault-card ${riskClass} rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-semibold text-lg">${vault.name}</h3>
                    <span class="${riskColor} text-sm font-medium uppercase">${vault.risk}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div class="text-gray-400 text-sm">Protocol</div>
                        <div class="font-semibold">${vault.protocol}</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">APY</div>
                        <div class="font-semibold text-green-400">${vault.apy}</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">TVL</div>
                        <div class="font-semibold">${vault.tvl}</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">IL Risk</div>
                        <div class="font-semibold">${vault.impermanentLoss}</div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-gray-400 text-sm">Fees: ${vault.fees}</span>
                    <button onclick="selectVault('${vault.name}')" 
                            class="btn-primary px-4 py-2 rounded-lg text-sm font-semibold">
                        Select Vault
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Animate vault cards
    anime({
        targets: '.vault-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 500,
        easing: 'easeOutQuart'
    });
}

function filterVaults(riskLevel) {
    // Update active filter button
    document.querySelectorAll('[id^="filter-"]').forEach(btn => {
        btn.classList.remove('bg-yellow-400', 'text-black');
        btn.classList.add('bg-gray-700', 'text-white');
    });
    
    const activeBtn = document.getElementById(`filter-${riskLevel}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-gray-700', 'text-white');
        activeBtn.classList.add('bg-yellow-400', 'text-black');
    }
    
    // Filter vaults
    const vaultCards = document.querySelectorAll('.vault-card');
    vaultCards.forEach(card => {
        if (riskLevel === 'all' || card.classList.contains(`risk-${riskLevel}`)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Portfolio Functions
function selectPortfolioNetwork(network) {
    currentPortfolioNetwork = network;
    
    // Update active tab
    document.querySelectorAll('[id^="portfolio-"]').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`portfolio-${network}`)?.classList.add('active');
    
    // Filter portfolio data
    loadPortfolioPositions();
}

function loadPortfolioPositions() {
    const tableBody = document.getElementById('positions-table');
    if (!tableBody) return;
    
    const filteredPositions = currentPortfolioNetwork === 'all' 
        ? portfolioPositions 
        : portfolioPositions.filter(pos => pos.network === currentPortfolioNetwork);
    
    let html = '';
    filteredPositions.forEach(position => {
        const pnlClass = position.pnl.includes('+') ? 'profit-positive' : 'profit-negative';
        const riskColor = position.risk === 'low' ? 'text-green-400' : 
                         position.risk === 'medium' ? 'text-yellow-400' : 'text-red-400';
        
        html += `
            <tr class="position-row">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img src="${position.protocolLogo}" alt="${position.protocol}" class="w-8 h-8 rounded-full mr-3">
                        <span class="font-semibold">${position.protocol}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-right">
                    <span class="uppercase font-medium">${position.network}</span>
                </td>
                <td class="px-6 py-4 text-right font-semibold">${position.value}</td>
                <td class="px-6 py-4 text-right text-green-400 font-semibold">${position.apy}</td>
                <td class="px-6 py-4 text-right font-semibold ${pnlClass}">${position.pnl}</td>
                <td class="px-6 py-4 text-center">
                    <span class="${riskColor} font-medium uppercase">${position.risk}</span>
                </td>
                <td class="px-6 py-4 text-center">
                    <button onclick="managePosition('${position.protocol}')" 
                            class="text-blue-400 hover:text-blue-300 font-medium">
                        Manage
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

function initializePortfolioCharts() {
    // Performance Chart
    const performanceChart = echarts.init(document.getElementById('performance-chart'));
    const performanceOption = {
        backgroundColor: 'transparent',
        textStyle: { color: '#ffffff' },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#D4AF37',
            textStyle: { color: '#ffffff' }
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' },
            splitLine: { lineStyle: { color: '#6C757D', opacity: 0.3 } }
        },
        series: [{
            data: [100000, 105000, 112000, 118000, 125000, 127450],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#D4AF37', width: 3 },
            itemStyle: { color: '#D4AF37' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(212, 175, 55, 0.3)' },
                        { offset: 1, color: 'rgba(212, 175, 55, 0.1)' }
                    ]
                }
            }
        }]
    };
    performanceChart.setOption(performanceOption);
    
    // Asset Allocation Chart
    const allocationChart = echarts.init(document.getElementById('allocation-chart'));
    const allocationOption = {
        backgroundColor: 'transparent',
        textStyle: { color: '#ffffff' },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#D4AF37',
            textStyle: { color: '#ffffff' }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 35, name: 'Stablecoins', itemStyle: { color: '#4A90E2' } },
                { value: 25, name: 'ETH', itemStyle: { color: '#D4AF37' } },
                { value: 20, name: 'BTC', itemStyle: { color: '#FFC107' } },
                { value: 15, name: 'DeFi Tokens', itemStyle: { color: '#28A745' } },
                { value: 5, name: 'Others', itemStyle: { color: '#6C757D' } }
            ],
            label: { color: '#ffffff' },
            labelLine: { lineStyle: { color: '#ffffff' } }
        }]
    };
    allocationChart.setOption(allocationOption);
    
    // Network Distribution Chart
    const networkChart = echarts.init(document.getElementById('network-chart'));
    const networkOption = {
        backgroundColor: 'transparent',
        textStyle: { color: '#ffffff' },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#D4AF37',
            textStyle: { color: '#ffffff' }
        },
        legend: {
            data: ['Base', 'Arbitrum', 'Solana', 'BNB Chain'],
            textStyle: { color: '#ffffff' }
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' },
            splitLine: { lineStyle: { color: '#6C757D', opacity: 0.3 } }
        },
        series: [
            {
                name: 'Base',
                type: 'bar',
                stack: 'total',
                data: [25000, 28000, 32000, 35000, 38000, 45000],
                itemStyle: { color: '#4A90E2' }
            },
            {
                name: 'Arbitrum',
                type: 'bar',
                stack: 'total',
                data: [30000, 32000, 35000, 38000, 42000, 48000],
                itemStyle: { color: '#D4AF37' }
            },
            {
                name: 'Solana',
                type: 'bar',
                stack: 'total',
                data: [15000, 18000, 22000, 25000, 28000, 32000],
                itemStyle: { color: '#FFC107' }
            },
            {
                name: 'BNB Chain',
                type: 'bar',
                stack: 'total',
                data: [20000, 22000, 24000, 26000, 28000, 30000],
                itemStyle: { color: '#28A745' }
            }
        ]
    };
    networkChart.setOption(networkOption);
    
    // Yield Farming Chart
    const yieldChart = echarts.init(document.getElementById('yield-chart'));
    const yieldOption = {
        backgroundColor: 'transparent',
        textStyle: { color: '#ffffff' },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#D4AF37',
            textStyle: { color: '#ffffff' }
        },
        legend: {
            data: ['Trading Fees', 'Rewards', 'Total Yield'],
            textStyle: { color: '#ffffff' }
        },
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' },
            splitLine: { lineStyle: { color: '#6C757D', opacity: 0.3 } }
        },
        series: [
            {
                name: 'Trading Fees',
                type: 'line',
                data: [120, 135, 148, 162, 178, 195],
                lineStyle: { color: '#4A90E2' },
                itemStyle: { color: '#4A90E2' }
            },
            {
                name: 'Rewards',
                type: 'line',
                data: [85, 92, 98, 105, 112, 125],
                lineStyle: { color: '#FFC107' },
                itemStyle: { color: '#FFC107' }
            },
            {
                name: 'Total Yield',
                type: 'line',
                data: [205, 227, 246, 267, 290, 320],
                lineStyle: { color: '#D4AF37', width: 3 },
                itemStyle: { color: '#D4AF37' }
            }
        ]
    };
    yieldChart.setOption(yieldOption);
    
    // Make charts responsive
    window.addEventListener('resize', function() {
        performanceChart.resize();
        allocationChart.resize();
        networkChart.resize();
        yieldChart.resize();
    });
}

// Chart Functions
function initializeRiskRewardChart() {
    const chart = echarts.init(document.getElementById('risk-reward-chart'));
    const option = {
        backgroundColor: 'transparent',
        textStyle: { color: '#ffffff' },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#D4AF37',
            textStyle: { color: '#ffffff' }
        },
        xAxis: {
            name: 'Risk Level',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: { color: '#ffffff' },
            type: 'value',
            min: 0,
            max: 10,
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' },
            splitLine: { lineStyle: { color: '#6C757D', opacity: 0.3 } }
        },
        yAxis: {
            name: 'Expected Return (%)',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: { color: '#ffffff' },
            type: 'value',
            axisLine: { lineStyle: { color: '#6C757D' } },
            axisLabel: { color: '#ffffff' },
            splitLine: { lineStyle: { color: '#6C757D', opacity: 0.3 } }
        },
        series: [{
            symbolSize: 20,
            data: [
                [2, 8, 'Conservative'],
                [5, 15, 'Balanced'],
                [8, 26, 'Aggressive']
            ],
            type: 'scatter',
            itemStyle: {
                color: function(params) {
                    const colors = ['#28A745', '#FFC107', '#DC2626'];
                    return colors[params.dataIndex];
                }
            },
            label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                formatter: function(params) {
                    return params.data[2];
                }
            }
        }]
    };
    chart.setOption(option);
    
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Animation Functions
function initializeAnimations() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    easing: 'easeOutQuart',
                    delay: element.dataset.delay || 0
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.card-hover, .metric-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function animateCounters() {
    const counters = [
        { id: 'tvl-counter', target: 2.57, suffix: 'B', duration: 2000 },
        { id: 'apy-counter', target: 15.8, suffix: '%', duration: 1500 },
        { id: 'protocols-counter', target: 127, suffix: '', duration: 2500 },
        { id: 'clients-counter', target: 1250, suffix: '+', duration: 3000 }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            anime({
                targets: { value: 0 },
                value: counter.target,
                duration: counter.duration,
                easing: 'easeOutQuart',
                update: function(anim) {
                    const value = anim.animatables[0].target.value;
                    element.textContent = value.toFixed(counter.id === 'tvl-counter' ? 2 : 0) + counter.suffix;
                }
            });
        }
    });
}

function animateAboutStats() {
    const stats = [
        { id: 'clients-stat', target: 1250, suffix: '+', duration: 2000 },
        { id: 'aum-stat', target: 127, suffix: 'M', duration: 2500 },
        { id: 'protocols-stat', target: 127, suffix: '', duration: 2200 },
        { id: 'return-stat', target: 16.8, suffix: '%', duration: 1800 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            anime({
                targets: { value: 0 },
                value: stat.target,
                duration: stat.duration,
                easing: 'easeOutQuart',
                update: function(anim) {
                    const value = anim.animatables[0].target.value;
                    element.textContent = value.toFixed(stat.id === 'return-stat' ? 1 : 0) + stat.suffix;
                }
            });
        }
    });
}

function initializeParticleBackground() {
    // Simple particle animation for hero background
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#D4AF37';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);
        
        // Animate particles
        anime({
            targets: particle,
            translateX: [0, Math.random() * 100 - 50],
            translateY: [0, Math.random() * 100 - 50],
            opacity: [particle.style.opacity, 0],
            duration: Math.random() * 5000 + 5000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    }
}

// Utility Functions
function exportPortfolio() {
    // Simulate portfolio export
    const data = {
        totalValue: '$127,450',
        totalGain: '+$15,230',
        positions: portfolioPositions,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'defi-portfolio-export.json';
    a.click();
    URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Portfolio exported successfully!', 'success');
}

function refreshPortfolio() {
    // Simulate data refresh
    showNotification('Portfolio data refreshed!', 'success');
    
    // Animate refresh
    anime({
        targets: '.metric-card',
        scale: [1, 1.05, 1],
        duration: 300,
        delay: anime.stagger(100)
    });
}

function selectVault(vaultName) {
    showNotification(`Selected vault: ${vaultName}`, 'info');
}

function managePosition(protocol) {
    showNotification(`Managing position for ${protocol}`, 'info');
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (answer && icon) {
        const isOpen = answer.classList.contains('open');
        
        if (isOpen) {
            answer.classList.remove('open');
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(el => {
                el.classList.remove('open');
            });
            document.querySelectorAll('[id^="faq-icon-"]').forEach(el => {
                el.style.transform = 'rotate(0deg)';
            });
            
            // Open current FAQ
            answer.classList.add('open');
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Simulate form submission
    showNotification('Thank you! We will contact you within 24 hours.', 'success');
    
    // Reset form
    e.target.reset();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
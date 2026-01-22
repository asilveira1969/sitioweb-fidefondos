# FideFondos DeFi - AI Coding Guidelines

## Project Architecture
- **Static website** with 4 HTML pages (index.html, strategies.html, portfolio.html, about.html) sharing common navigation
- **Single main.js** handles all interactivity with page-specific initialization via `initializePage()` function
- **CDN dependencies only**: Tailwind CSS, Anime.js, ECharts.js, Chart.js, Typed.js - no local builds or package managers
- **No backend**: All data is client-side, vault information hardcoded in `vaultData` object

## Development Workflow
- Open `index.html` directly in browser for basic testing
- Use `python -m http.server` for full functionality (CORS, etc.)
- No build process - edit HTML/JS directly

## Code Conventions
- **Language**: Spanish for UI text and HTML content, English for JS comments/variables/data
- **Styling**: Use Tailwind utility classes; custom CSS in `<style>` blocks with CSS variables
- **Colors**: `--primary-navy` (#0B1426), `--warm-gold` (#D4AF37), `--soft-blue` (#4A90E2)
- **Fonts**: `font-display` class for Playfair Display headings, Inter for body text
- **JS Structure**: Global variables at top, functions grouped by feature (risk assessment, ROI calculator, etc.)

## Key Patterns
- **Page Initialization**: Check `document.body.classList` or URL to run page-specific code (e.g., `initializeStrategiesPage()`)
- **Vault Data**: Objects with `{name, protocol, apy, tvl, risk, network, impermanentLoss, fees}` - add new vaults here
- **Event Listeners**: Use `setupEventListeners()` for common elements like mobile menu toggle
- **Animations**: Anime.js for complex animations, CSS transitions for simple hover effects
- **Charts**: ECharts for main visualizations, Chart.js for supplementary graphs
- **Risk Assessment**: 8-question quiz with scoring 1-4, results determine strategy recommendations

## Common Tasks
- Adding new vaults: Update `vaultData` object and ensure `loadVaultData()` filters correctly
- New pages: Copy nav from existing page, add to main.js `initializePage()` switch
- Styling: Use Tailwind first, add custom CSS only for complex effects like gradients
- Mobile: Test hamburger menu and responsive grid layouts

## File References
- [main.js](main.js) - Core logic and data structures
- [index.html](index.html) - Hero section and metrics example
- [README.md](README.md) - Tech stack and setup</content>
<parameter name="filePath">c:\001 Anastacio escritorio MELO\001 FIDEFONDO no tocar\.github\copilot-instructions.md
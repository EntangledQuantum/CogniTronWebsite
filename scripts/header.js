// Shared Header Component
// This script injects a consistent header across all pages

(function () {
    // Determine if we're on the homepage or a subpage
    const isHomePage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    // Set path prefix based on location
    const pathPrefix = isHomePage ? '' : '../';
    const pagePrefix = isHomePage ? 'pages/' : '';

    // Get current page to set active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Helper function to determine active class
    function isActive(page) {
        if (page === currentPage) return ' active';
        if (page === 'index.html' && (currentPage === '' || currentPage === '/')) return ' active';
        return '';
    }

    // Helper for dropdown active state
    function isDropdownActive(page) {
        return currentPage === page ? ' active' : '';
    }

    const headerHTML = `
    <!-- Header Navigation -->
    <header class="main-header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo-section">
                    <a href="${pathPrefix}index.html">
                        <img src="${pathPrefix}assets/logo.png" alt="CogniTron Logo" class="logo">
                        <span class="company-name">CogniTron</span>
                    </a>
                </div>
                <div class="nav-links">
                    <div class="nav-item industries-dropdown">
                        <span>Solutions</span>
                        <div class="dropdown-content">
                            <a href="${pagePrefix}digital-guardian.html" class="dropdown-item${isDropdownActive('digital-guardian.html')}">Digital Guardian</a>
                            <a href="${pagePrefix}terraforge.html" class="dropdown-item${isDropdownActive('terraforge.html')}">TerraForge</a>
                            <a href="${pagePrefix}machine-shops.html" class="dropdown-item${isDropdownActive('machine-shops.html')}">Machine Shops</a>
                        </div>
                    </div>
                    <a href="${pagePrefix}capabilities.html" class="nav-item${isActive('capabilities.html')}">Capabilities</a>
                    <a href="${pagePrefix}careers.html" class="nav-item${isActive('careers.html')}">Careers</a>
                </div>
            </div>
        </nav>
    </header>
    `;

    // Find the header placeholder and replace it
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.outerHTML = headerHTML;
    }
})();

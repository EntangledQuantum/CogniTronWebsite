// Shared Footer Component
// This script injects a consistent footer across all pages

(function () {
    // Determine if we're on the homepage or a subpage
    const isHomePage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    // Set path prefix based on location
    const pathPrefix = isHomePage ? '' : '../';

    const footerHTML = `
    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <img src="${pathPrefix}assets/logo.png" alt="CogniTron Logo" class="footer-logo">
                <h3>CogniTron</h3>
                <p class="footer-tagline">Manufacturing the Future</p>
            </div>

            <div class="footer-contact">
                <h4>Get in Touch</h4>
                <p>Milpitas, CA, USA</p>
                <button class="contact-footer-btn">Contact Us</button>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 CogniTron. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Contact Modal -->
    <div class="contact-modal" id="contactModal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Contact Us</h2>
            <form class="contact-form" id="contactForm" method="POST">
                <input type="hidden" name="access_key" value="b06ea6fa-bff0-42be-85ce-6d86024d32fa">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <input type="text" name="subject" placeholder="Subject" required>
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>
    </div>
    `;

    // Find the footer placeholder and replace it
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.outerHTML = footerHTML;
    }
})();

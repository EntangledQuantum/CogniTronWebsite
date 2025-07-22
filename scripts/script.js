// Particle Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00ff88', '#00ccff', '#ffffff']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff88',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Dynamic Light Trail (Scroll Progress)
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
    const lightTrail = document.querySelector('.light-trail');
    lightTrail.style.transform = `scaleX(${scrollPercentage})`;
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animations for child cards
            const cards = entry.target.querySelectorAll('[data-card]');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections with data-scroll
document.querySelectorAll('[data-scroll]').forEach(section => {
    scrollObserver.observe(section);
});

// Global Mouse Glow Effect for Card Borders
let globalMouseX = 0;
let globalMouseY = 0;
const influenceRadius = 800; // Pixels - radius of cursor influence

function initializeGlobalCardBorderGlow() {
    const cards = document.querySelectorAll('[data-card], .stat-item, .coming-soon, .position-card, .challenge-card, .grid-line');
    
    // Global mouse move handler
    document.addEventListener('mousemove', (e) => {
        globalMouseX = e.clientX;
        globalMouseY = e.clientY;
        
        // Update all cards based on global mouse position
        updateCardGlows();
    });
    
    function updateCardGlows() {
        cards.forEach(card => {
            // Skip if not visible or already processed
            if (card.dataset.glowInitialized !== 'true') {
                initializeCard(card);
            }
            
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to card center
            const distance = Math.sqrt(
                Math.pow(globalMouseX - cardCenterX, 2) + 
                Math.pow(globalMouseY - cardCenterY, 2)
            );
            
            // Calculate influence based on distance (closer = stronger)
            const influence = Math.max(0, 1 - (distance / influenceRadius));
            
            if (influence > 0) {
                // Calculate relative position of mouse to card
                const relativeX = globalMouseX - rect.left;
                const relativeY = globalMouseY - rect.top;
                
                // Convert to percentages (can go beyond 0-100% for external influence)
                const xPercent = (relativeX / rect.width) * 100;
                const yPercent = (relativeY / rect.height) * 100;
                
                // Apply gradient border using CSS custom properties
                card.style.setProperty('--mouse-x', `${xPercent}%`);
                card.style.setProperty('--mouse-y', `${yPercent}%`);
                card.style.setProperty('--border-opacity', influence.toString());
                card.style.setProperty('--glow-intensity', influence.toString());
            } else {
                // Fade out the border glow when too far
                card.style.setProperty('--border-opacity', '0');
                card.style.setProperty('--glow-intensity', '0');
            }
        });
    }
    
    function initializeCard(card) {
        card.dataset.glowInitialized = 'true';
        
        // Initialize CSS variables
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
        card.style.setProperty('--border-opacity', '0');
        card.style.setProperty('--glow-intensity', '0');
    }
    
    // Initialize all cards
    cards.forEach(initializeCard);
}

// Initialize on page load
initializeGlobalCardBorderGlow();

// Re-initialize when DOM content is loaded (for other pages)
document.addEventListener('DOMContentLoaded', initializeGlobalCardBorderGlow);

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = '';
    }
    
    lastScroll = currentScroll;
});

// Contact Modal
const contactModal = document.getElementById('contactModal');
const contactBtns = document.querySelectorAll('.contact-btn, .contact-footer-btn');
const closeModal = document.querySelector('.close-modal');

contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
    document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Here you would normally send the data to your server
    // For now, we'll just log it and show a success message
    console.log('Form data:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
    contactModal.style.display = 'none';
    document.body.style.overflow = '';
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Industries Dropdown Enhancement
const industriesDropdown = document.querySelector('.industries-dropdown');
let dropdownTimeout;

industriesDropdown.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
});

industriesDropdown.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        // Additional cleanup if needed
    }, 300);
});

// Play Button Animation
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const video = button.parentElement.querySelector('img');
        // Here you would typically open a video modal or start playing
        console.log('Play video');
    });
});

// Advanced Card Hover Effects
const featureCards = document.querySelectorAll('.feature-card, .career-card, .industry-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('svg');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.principle-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.8s ease';
    timelineObserver.observe(item);
});

// Demo Video Hover Effect
const demoVideos = document.querySelectorAll('.demo-video');
demoVideos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        const overlay = video.querySelector('.video-overlay');
        overlay.style.background = 'linear-gradient(135deg, transparent 0%, rgba(0, 255, 136, 0.2) 100%)';
    });
    
    video.addEventListener('mouseleave', () => {
        const overlay = video.querySelector('.video-overlay');
        overlay.style.background = 'linear-gradient(135deg, transparent 0%, rgba(0, 255, 136, 0.1) 100%)';
    });
});

// Initialize AOS-like animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states for cards
    const allCards = document.querySelectorAll('[data-card]');
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Animate hero content
    const heroElements = document.querySelectorAll('.hero-title, .hero-tagline, .cta-button, .scroll-indicator');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Remove animation from scroll indicator after it completes
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.animation = 'none';
            // Check if already scrolled and hide immediately
            if (window.scrollY > 50) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
                scrollIndicator.style.pointerEvents = 'none';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            }
        }, 2000); // After animation completes
    }
    
    // Also check on initial load if page is already scrolled
    if (window.scrollY > 50 && scrollIndicator) {
        scrollIndicator.style.animation = 'none';
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
        scrollIndicator.style.pointerEvents = 'none';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const ctaButton = document.querySelector('.hero-content .cta-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrolled < window.innerHeight) {
        // Apply parallax to title, tagline, and button
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroTitle.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        if (heroTagline) {
            heroTagline.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroTagline.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        if (ctaButton) {
            ctaButton.style.transform = `translateY(${scrolled * 0.3}px)`;
            ctaButton.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        // Hide scroll indicator quickly when scrolling starts
        if (scrollIndicator && scrolled > 50) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
            scrollIndicator.style.pointerEvents = 'none';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else if (scrollIndicator && scrolled <= 50) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
            scrollIndicator.style.pointerEvents = 'auto';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
});

// Dynamic Background Gradient
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.05;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
});

function animateBackground() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.background = `
            radial-gradient(ellipse at ${currentX}% ${currentY}%, 
                rgba(0, 255, 136, 0.1) 0%, 
                transparent 40%),
            linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)
        `;
    }
    
    requestAnimationFrame(animateBackground);
}

animateBackground();

// Performance optimization: Throttle scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        // Scroll-based animations here
    }, 10);
});

// Add form field names
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs[0].setAttribute('name', 'name');
        inputs[1].setAttribute('name', 'email');
        inputs[2].setAttribute('name', 'subject');
        inputs[3].setAttribute('name', 'message');
    }
}); 
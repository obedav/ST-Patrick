/**
 * main.js - St. Patrick's Catholic Church Website
 * Beautiful, interactive JavaScript for enhanced user experience
 * Features: Smooth animations, mobile navigation, form handling, spiritual touches
 */

// ============================================================================
// INITIALIZATION AND CONFIGURATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🙏 St. Patrick\'s Catholic Church - Website Loaded');
    
    // Initialize all features
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeForms();
    initializeSpritualFeatures();
    initializeUtilities();
    
    // Show welcome message for first-time visitors
    showWelcomeMessage();
});

// Global configuration
const CONFIG = {
    animationDuration: 600,
    scrollOffset: 100,
    autoHideDelay: 5000,
    blessingMessages: [
        "May God bless your visit to our parish family",
        "Peace be with you as you explore our community",
        "Welcome to St. Patrick's - where faith comes alive",
        "May you find spiritual nourishment here today"
    ]
};

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================

function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');
    
    // Mobile menu toggle with smooth animation
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            // Toggle menu with animation
            navMenu.classList.toggle('active');
            
            // Update button appearance
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
            
            // Animate hamburger to X
            updateMobileMenuIcon(this, !isActive);
            
            // Stagger animation for menu items
            if (!isActive) {
                animateMenuItems(navMenu);
            }
        });
    }
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                updateMobileMenuIcon(mobileMenuBtn, false);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    updateMobileMenuIcon(mobileMenuBtn, false);
                }
            }
        }
    });
    
    // Active page highlighting
    highlightActivePage();
    
    // Smooth scroll for anchor links
    initializeSmoothScroll();
}

function updateMobileMenuIcon(button, isOpen) {
    const icon = button.textContent;
    if (isOpen) {
        button.innerHTML = '✕';
        button.style.transform = 'rotate(180deg)';
    } else {
        button.innerHTML = '☰';
        button.style.transform = 'rotate(0deg)';
    }
}

function animateMenuItems(menu) {
    const items = menu.querySelectorAll('li');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'home.html') ||
            (currentPage === 'index.html' && linkPage === 'home.html')) {
            link.classList.add('active');
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add a gentle glow effect to the target
                target.style.transition = 'box-shadow 0.5s ease';
                target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                
                setTimeout(() => {
                    target.style.boxShadow = '';
                }, 2000);
            }
        });
    });
}

// ============================================================================
// SCROLL EFFECTS AND ANIMATIONS
// ============================================================================

function initializeScrollEffects() {
    // Parallax effect for home page hero
    if (document.body.classList.contains('home-page')) {
        initializeParallax();
    }
    
    // Scroll-triggered animations
    initializeScrollAnimations();
    
    // Back to top button
    createBackToTopButton();
    
    // Header scroll effect for non-home pages
    if (!document.body.classList.contains('home-page')) {
        initializeHeaderScrollEffect();
    }
}

function initializeParallax() {
    const heroBackground = document.querySelector('.fixed-hero-background');
    if (!heroBackground) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        heroBackground.style.transform = `translateY(${parallax}px)`;
    });
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .announcement-card,
        .quick-access-card,
        .sacrament-item,
        .staff-card,
        .contact-card,
        .resource-item,
        .sidebar-widget
    `);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add a slight delay for staggered animations
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.animation = `slideInUp 0.6s ease forwards ${delay}ms`;
                }, 0);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '⬆️';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(26, 35, 126, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add blessing animation
        showBlessingMessage("May you find what you seek at the top! 🙏");
    });
}

function initializeHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================================================
// FORM HANDLING
// ============================================================================

function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initializeContactForm(contactForm);
    }
    
    // Prayer request form
    const prayerForm = document.getElementById('prayer-request-form');
    if (prayerForm) {
        initializePrayerForm(prayerForm);
    }
    
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => initializeNewsletterForm(form));
    
    // Generic form enhancements
    enhanceFormFields();
}

function initializeContactForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateContactForm(form)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        showLoadingState(form);
        
        // Simulate form submission
        setTimeout(() => {
            hideLoadingState(form);
            showNotification('🙏 Thank you! Your message has been sent. We\'ll respond within 24 hours.', 'success');
            form.reset();
            showBlessingMessage("May God bless your inquiry and guide our response.");
        }, 2000);
    });
}

function initializePrayerForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const prayerRequest = form.querySelector('[name="prayer-request"]').value;
        if (!prayerRequest.trim()) {
            showNotification('Please share your prayer intention.', 'error');
            return;
        }
        
        showLoadingState(form);
        
        setTimeout(() => {
            hideLoadingState(form);
            showNotification('🙏 Your prayer intention has been received and will be included in our daily prayers.', 'success');
            form.reset();
            showBlessingMessage("Your prayers are lifted up to God. May you find peace and comfort.");
        }, 1500);
    });
}

function initializeNewsletterForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showLoadingState(form);
        
        setTimeout(() => {
            hideLoadingState(form);
            showNotification('📧 Successfully subscribed to our parish newsletter!', 'success');
            form.reset();
        }, 1000);
    });
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

function enhanceFormFields() {
    // Add floating labels effect
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formFields.forEach(field => {
        // Focus and blur effects
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Real-time validation feedback
        field.addEventListener('input', function() {
            if (this.hasAttribute('required')) {
                if (this.value.trim()) {
                    this.classList.remove('error');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                }
            }
        });
    });
}

// ============================================================================
// SPIRITUAL FEATURES
// ============================================================================

function initializeSpritualFeatures() {
    // Daily scripture verse
    displayDailyVerse();
    
    // Prayer intentions tracker
    initializePrayerTracker();
    
    // Liturgical calendar integration
    showLiturgicalSeason();
    
    // Blessing animations
    addBlessingEffects();
    
    // Mass countdown timer
    initializeMassCountdown();
}

function displayDailyVerse() {
    const verses = [
        {
            text: "For where two or three gather in my name, there am I with them.",
            reference: "Matthew 18:20"
        },
        {
            text: "Be it done unto me according to your word.",
            reference: "Luke 1:38"
        },
        {
            text: "I am the way and the truth and the life.",
            reference: "John 14:6"
        },
        {
            text: "Come to me, all you who are weary and burdened, and I will give you rest.",
            reference: "Matthew 11:28"
        },
        {
            text: "Trust in the Lord with all your heart and lean not on your own understanding.",
            reference: "Proverbs 3:5"
        }
    ];
    
    const today = new Date().getDay();
    const dailyVerse = verses[today] || verses[0];
    
    // Create or update daily verse display
    let verseContainer = document.querySelector('.daily-verse');
    if (!verseContainer) {
        verseContainer = createDailyVerseContainer();
    }
    
    if (verseContainer) {
        verseContainer.innerHTML = `
            <div class="verse-text">"${dailyVerse.text}"</div>
            <div class="verse-reference">- ${dailyVerse.reference}</div>
        `;
    }
}

function createDailyVerseContainer() {
    const container = document.createElement('div');
    container.className = 'daily-verse';
    container.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        max-width: 300px;
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border-left: 4px solid var(--primary-color);
        font-size: 0.9rem;
        line-height: 1.4;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(container);
    
    // Show after a delay
    setTimeout(() => {
        container.style.transform = 'translateX(0)';
    }, 3000);
    
    // Auto-hide after reading time
    setTimeout(() => {
        container.style.transform = 'translateX(-100%)';
    }, CONFIG.autoHideDelay + 3000);
    
    return container;
}

function initializePrayerTracker() {
    // Track prayer intentions submitted
    const prayerCount = localStorage.getItem('prayerCount') || 0;
    
    // Update prayer counter if element exists
    const prayerCounter = document.querySelector('.prayer-counter');
    if (prayerCounter) {
        prayerCounter.textContent = `${prayerCount} prayers offered`;
    }
}

function showLiturgicalSeason() {
    const seasons = {
        advent: { color: '#663399', message: 'Advent - Prepare the way of the Lord' },
        christmas: { color: '#FFD700', message: 'Christmas - Christ is born!' },
        lent: { color: '#663399', message: 'Lent - A time of prayer, fasting, and almsgiving' },
        easter: { color: '#FFFFFF', message: 'Easter - Christ is risen! Alleluia!' },
        ordinary: { color: '#2E7D32', message: 'Ordinary Time - Growing in faith' }
    };
    
    // Simple season detection (would be more sophisticated in real implementation)
    const month = new Date().getMonth() + 1;
    let currentSeason = 'ordinary';
    
    if (month === 12 || month === 1) currentSeason = 'christmas';
    if (month >= 3 && month <= 4) currentSeason = 'lent';
    if (month === 5) currentSeason = 'easter';
    
    const seasonInfo = seasons[currentSeason];
    const seasonIndicator = document.querySelector('.liturgical-season');
    
    if (seasonIndicator) {
        seasonIndicator.style.color = seasonInfo.color;
        seasonIndicator.textContent = seasonInfo.message;
    }
}

function addBlessingEffects() {
    // Add subtle blessing animations to key elements
    const blessableElements = document.querySelectorAll('.quick-access-card, .sacrament-item, .contact-card');
    
    blessableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (Math.random() < 0.3) { // 30% chance
                showMicroBlessing(this);
            }
        });
    });
}

function showMicroBlessing(element) {
    const blessing = document.createElement('div');
    blessing.textContent = '✨';
    blessing.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.2rem;
        opacity: 0;
        animation: blessingSparkle 2s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(blessing);
    
    setTimeout(() => {
        if (blessing.parentNode) {
            blessing.remove();
        }
    }, 2000);
}

function initializeMassCountdown() {
    const massCountdown = document.querySelector('.mass-countdown');
    if (!massCountdown) return;
    
    function updateCountdown() {
        const now = new Date();
        const nextMass = getNextMassTime(now);
        
        if (!nextMass) return;
        
        const timeDiff = nextMass - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        massCountdown.innerHTML = `Next Mass in: ${hours}h ${minutes}m`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

function getNextMassTime(now) {
    // Simplified mass schedule - would be more comprehensive in real implementation
    const massSchedule = [
        { day: 6, time: 17 }, // Saturday 5:00 PM
        { day: 0, time: 8 },  // Sunday 8:00 AM
        { day: 0, time: 10 }, // Sunday 10:00 AM
        { day: 0, time: 12 }  // Sunday 12:00 PM
    ];
    
    // Find next mass (simplified logic)
    for (let mass of massSchedule) {
        const massDate = new Date(now);
        massDate.setDate(now.getDate() + (mass.day - now.getDay() + 7) % 7);
        massDate.setHours(mass.time, 0, 0, 0);
        
        if (massDate > now) {
            return massDate;
        }
    }
    
    return null;
}

// ============================================================================
// ANIMATIONS AND VISUAL EFFECTS
// ============================================================================

function initializeAnimations() {
    // Add CSS animations
    addAnimationStyles();
    
    // Particle effects for special occasions
    if (isSpecialOccasion()) {
        initializeParticleEffects();
    }
    
    // Typing animation for hero text
    initializeTypingAnimation();
    
    // Card hover effects
    enhanceCardAnimations();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes blessingSparkle {
            0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
            100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
        }
        
        @keyframes gentleGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
        }
        
        .form-group.focused label {
            color: var(--primary-color);
            transform: translateY(-5px);
            font-size: 0.9rem;
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: var(--crimson-red);
            animation: shake 0.5s ease-in-out;
        }
        
        .form-group input.valid,
        .form-group textarea.valid,
        .form-group select.valid {
            border-color: var(--secondary-color);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .blessing-message {
            animation: gentleGlow 2s ease-in-out;
        }
    `;
    
    document.head.appendChild(style);
}

function isSpecialOccasion() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Christmas season, Easter, St. Patrick's Day, etc.
    return (month === 12 && day >= 20) || 
           (month === 1 && day <= 10) || 
           (month === 3 && day === 17) ||
           (month === 4 && day >= 15 && day <= 25); // Easter approximation
}

function initializeParticleEffects() {
    // Simple particle system for special occasions
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            color: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3});
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add fall animation
    const fallAnimation = document.createElement('style');
    fallAnimation.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fallAnimation);
}

function initializeTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-color)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

function enhanceCardAnimations() {
    const cards = document.querySelectorAll('.quick-access-card, .announcement-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function initializeUtilities() {
    // Keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Print functionality
    initializePrintFeatures();
    
    // Accessibility enhancements
    enhanceAccessibility();
    
    // Performance optimizations
    optimizePerformance();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#2E7D32',
        error: '#B71C1C',
        info: '#1A237E',
        warning: '#F57C00'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function showBlessingMessage(message) {
    const blessing = document.createElement('div');
    blessing.className = 'blessing-message';
    blessing.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 35, 126, 0.95);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        font-style: italic;
        z-index: 10001;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 2px solid var(--accent-color);
    `;
    
    blessing.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem;">🙏</div>
        <div>${message}</div>
    `;
    
    document.body.appendChild(blessing);
    
    setTimeout(() => {
        blessing.style.opacity = '0';
        blessing.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            if (blessing.parentNode) {
                blessing.remove();
            }
        }, 500);
    }, 3000);
}

function showWelcomeMessage() {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            const randomBlessing = CONFIG.blessingMessages[Math.floor(Math.random() * CONFIG.blessingMessages.length)];
            showBlessingMessage(randomBlessing);
            localStorage.setItem('hasVisited', 'true');
        }, 2000);
    }
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '🙏 Sending...';
        submitBtn.style.opacity = '0.7';
    }
    
    form.style.pointerEvents = 'none';
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Send Message';
        submitBtn.style.opacity = '1';
    }
    
    form.style.pointerEvents = 'auto';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + H: Go to home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'home.html';
        }
        
        // Alt + C: Go to contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            window.location.href = 'contact.html';
        }
        
        // Alt + M: Go to mass times
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            window.location.href = 'mass_times.html';
        }
        
        // Alt + P: Submit prayer request
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            const prayerSection = document.getElementById('prayer-form');
            if (prayerSection) {
                prayerSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Escape: Close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('nav ul');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    updateMobileMenuIcon(mobileMenuBtn, false);
                }
            }
        }
    });
}

function initializePrintFeatures() {
    // Add print button for bulletins and resources
    const printableContent = document.querySelectorAll('.bulletin, .resource-content, .sermon-content');
    
    printableContent.forEach(content => {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '🖨️ Print';
        printBtn.className = 'print-btn';
        printBtn.style.cssText = `
            background: var(--light-gray);
            border: 1px solid var(--border-color);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin: 1rem 0;
            transition: var(--transition);
        `;
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        content.insertBefore(printBtn, content.firstChild);
    });
    
    // Optimize print styles
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

function enhanceAccessibility() {
    // Add skip links
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Enhance keyboard navigation
    const focusableElements = document.querySelectorAll(`
        a[href], button, input, textarea, select, 
        [tabindex]:not([tabindex="-1"])
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Announce important changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Function to announce messages
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandlers = [];
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Trigger optimized scroll handlers
            originalScrollHandlers.forEach(handler => handler());
        }, 16); // ~60fps
    });
    
    // Preload critical pages
    const criticalPages = ['mass_times.html', 'contact.html'];
    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// ============================================================================
// SPECIAL FEATURES FOR CHURCH WEBSITE
// ============================================================================

// Prayer intention counter
function incrementPrayerCount() {
    let count = parseInt(localStorage.getItem('prayerCount') || '0');
    count++;
    localStorage.setItem('prayerCount', count.toString());
    
    // Update display if element exists
    const counter = document.querySelector('.prayer-counter');
    if (counter) {
        counter.textContent = `${count} prayers offered`;
    }
    
    return count;
}

// Mass reminder notification
function checkMassReminder() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    // Saturday evening or Sunday morning reminders
    if ((day === 6 && hour === 16) || (day === 0 && hour === 7)) {
        showNotification('⛪ Mass begins in one hour. See you there!', 'info');
    }
}

// Feast day celebrations
function checkFeastDay() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    const feastDays = {
        '3-17': 'Happy Feast Day of St. Patrick! 🍀',
        '12-25': 'Merry Christmas! Christ is born! 🎄',
        '1-1': 'Happy New Year! May God bless this year abundantly! 🎊',
        '4-1': 'Happy Easter! He is Risen! Alleluia! 🐣' // Simplified - would calculate actual Easter
    };
    
    const todayKey = `${month}-${day}`;
    if (feastDays[todayKey]) {
        setTimeout(() => {
            showBlessingMessage(feastDays[todayKey]);
        }, 1000);
    }
}

// Bible verse of the day with reflection
function showBibleReflection() {
    const reflections = [
        {
            verse: "Be still and know that I am God.",
            reference: "Psalm 46:10",
            reflection: "In our busy lives, we need moments of silence to hear God's voice."
        },
        {
            verse: "Cast all your anxiety on him because he cares for you.",
            reference: "1 Peter 5:7",
            reflection: "God invites us to bring our worries to Him in prayer."
        },
        {
            verse: "Love one another as I have loved you.",
            reference: "John 15:12",
            reflection: "Christ's love is our model for loving others selflessly."
        }
    ];
    
    const today = new Date().getDate();
    const todayReflection = reflections[today % reflections.length];
    
    // Show reflection in a beautiful modal after page load
    setTimeout(() => {
        if (!sessionStorage.getItem('reflectionShown')) {
            showReflectionModal(todayReflection);
            sessionStorage.setItem('reflectionShown', 'true');
        }
    }, 5000);
}

function showReflectionModal(reflection) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        padding: 2rem;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-top: 4px solid var(--primary-color);
        ">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Daily Reflection</h3>
            <p style="font-style: italic; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-dark);">
                "${reflection.verse}"
            </p>
            <p style="color: var(--accent-color); font-weight: bold; margin-bottom: 1.5rem;">
                - ${reflection.reference}
            </p>
            <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 2rem;">
                ${reflection.reflection}
            </p>
            <button onclick="this.closest('.reflection-modal').remove()" 
                    style="background: var(--primary-color); color: white; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer;">
                🙏 Amen
            </button>
        </div>
    `;
    
    modal.className = 'reflection-modal';
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ============================================================================
// INITIALIZATION COMPLETE
// ============================================================================

// Run special church features
setTimeout(() => {
    checkMassReminder();
    checkFeastDay();
    showBibleReflection();
}, 3000);

// Update prayer intentions count when forms are submitted
document.addEventListener('submit', function(e) {
    if (e.target.id === 'prayer-request-form') {
        incrementPrayerCount();
    }
});

// Log completion
console.log('✨ St. Patrick\'s Catholic Church website fully initialized');
console.log('🙏 May this digital space bring people closer to God');

// Export functions for external use
window.StPatricksChurch = {
    showNotification,
    showBlessingMessage,
    incrementPrayerCount,
    announceToScreenReader: window.announceToScreenReader
};
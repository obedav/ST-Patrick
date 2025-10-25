// Modern JavaScript for St. Patrick's Website

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !nav.contains(event.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Dropdown Menu Functionality with improved touch support
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    dropdownToggles.forEach(toggle => {
        // Toggle on click (works for both touch and desktop)
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.parentElement;
            const isActive = dropdown.classList.contains('active');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close all other dropdowns
            document.querySelectorAll('.nav-dropdown.active').forEach(d => {
                const otherToggle = d.querySelector('.dropdown-toggle');
                if (otherToggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
                d.classList.remove('active');
            });

            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // For non-touch devices, also support hover
        if (!isTouchDevice) {
            const dropdown = toggle.parentElement;
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
            });
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }

        // Keyboard navigation support
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                const dropdown = this.parentElement;
                dropdown.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                this.focus();
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close dropdown when clicking on a dropdown item
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation class
document.querySelectorAll('.feature-card, .stat-box, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const formInputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');

    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        let errorMessage = formGroup.querySelector('.error-message');

        // Create error message element if it doesn't exist
        if (!errorMessage) {
            errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.setAttribute('role', 'alert');
            formGroup.appendChild(errorMessage);
        }

        // Remove previous validation states
        input.classList.remove('error', 'success');
        errorMessage.classList.remove('show');

        // Validate required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            errorMessage.textContent = 'This field is required';
            errorMessage.classList.add('show');
        }
        // Validate email
        else if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.classList.add('show');
            } else {
                input.classList.add('success');
                input.setAttribute('aria-invalid', 'false');
            }
        }
        // Validate phone
        else if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(input.value) || input.value.replace(/\D/g, '').length < 10) {
                isValid = false;
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
                errorMessage.textContent = 'Please enter a valid phone number';
                errorMessage.classList.add('show');
            } else {
                input.classList.add('success');
                input.setAttribute('aria-invalid', 'false');
            }
        }
        else if (input.value.trim()) {
            input.classList.add('success');
            input.setAttribute('aria-invalid', 'false');
        }
    });

    return isValid;
}

// Real-time validation on blur
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');

    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const form = this.closest('form');
            if (form) {
                // Validate just this field
                const tempForm = document.createElement('form');
                const formGroup = this.closest('.form-group').cloneNode(true);
                tempForm.appendChild(formGroup);
                validateForm(tempForm);

                // Copy validation state back to original
                const clonedInput = formGroup.querySelector('.form-input, .form-textarea, .form-select');
                const originalFormGroup = this.closest('.form-group');
                this.className = clonedInput.className;
                this.setAttribute('aria-invalid', clonedInput.getAttribute('aria-invalid') || 'false');

                const errorMsg = originalFormGroup.querySelector('.error-message');
                const clonedError = formGroup.querySelector('.error-message');
                if (errorMsg && clonedError) {
                    errorMsg.textContent = clonedError.textContent;
                    errorMsg.className = clonedError.className;
                }
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const formGroup = this.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.classList.remove('show');
            }
        });
    });

    // Handle form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!validateForm(this)) {
                // Focus on first error
                const firstError = this.querySelector('.form-input.error, .form-textarea.error, .form-select.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message show';
                successDiv.style.cssText = 'background: var(--secondary-green); color: white; padding: var(--space-4); border-radius: var(--radius-lg); margin-top: var(--space-4); text-align: center;';
                successDiv.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
                successDiv.setAttribute('role', 'alert');

                this.insertAdjacentElement('afterend', successDiv);
                this.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);

            } catch (error) {
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message show';
                errorDiv.style.cssText = 'background: var(--crimson-red); color: white; padding: var(--space-4); border-radius: var(--radius-lg); margin-top: var(--space-4); text-align: center;';
                errorDiv.textContent = '✗ Sorry, there was an error sending your message. Please try again.';
                errorDiv.setAttribute('role', 'alert');

                this.insertAdjacentElement('afterend', errorDiv);

                setTimeout(() => {
                    errorDiv.remove();
                }, 5000);
            } finally {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Animate skill bars when in view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.getAttribute('data-skill');
                    entry.target.style.width = skillLevel + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Fade in animation for sections
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .education-card, .cert-card, .additional-card, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    // Contact form validation
    function setupFormValidation() {
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        subjectInput.addEventListener('blur', validateSubject);
        messageInput.addEventListener('blur', validateMessage);

        // Clear errors on focus
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('focus', function() {
                clearError(this.id);
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Simulate form submission
                showSuccessMessage();
                form.reset();
            }
        });

        function validateName() {
            const name = nameInput.value.trim();
            if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
                return false;
            }
            clearError('nameError');
            return true;
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                return false;
            }
            clearError('emailError');
            return true;
        }

        function validateSubject() {
            const subject = subjectInput.value.trim();
            if (subject.length < 3) {
                showError('subjectError', 'Subject must be at least 3 characters long');
                return false;
            }
            clearError('subjectError');
            return true;
        }

        function validateMessage() {
            const message = messageInput.value.trim();
            if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                return false;
            }
            clearError('messageError');
            return true;
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.classList.remove('show');
        }

        function showSuccessMessage() {
            // Create and show success message
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #00b388 0%, #009970 100%);
                color: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0, 179, 136, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: 600;
                font-size: 1.1rem;
            `;
            successDiv.innerHTML = `
                <svg style="width: 48px; height: 48px; margin-bottom: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>Message sent successfully!</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.9;">I'll get back to you soon.</div>
            `;
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

    // Initialize all functions
    animateSkillBars();
    animateOnScroll();
    setupFormValidation();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.style.transform = `rotate(5deg) translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Intersection Observer for scroll animations
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

// Apply animation to all sections
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});
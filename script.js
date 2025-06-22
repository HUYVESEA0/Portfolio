// ========================================
// PHASE 3: INTERACTIVE & ADVANCED FEATURES
// ========================================

// Loading Screen Management
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Initialize animations after loading
        initializeAnimations();
    }, 1500);
});

// Typing Animation
function initTypingAnimation() {
    const texts = [
        'Aspiring Developer',
        'Web Development Enthusiast', 
        'Future Full-Stack Developer',
        'Passionate Learner',
        'Code Explorer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typed-text');
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
    }

    type();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill progress bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillProgress(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.classList.add('fade-in-up', `stagger-${(index % 6) + 1}`);
        observer.observe(item);
    });

    document.querySelectorAll('.project-card').forEach((item, index) => {
        item.classList.add('fade-in-up', `stagger-${(index % 3) + 1}`);
        observer.observe(item);
    });

    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.classList.add('fade-in-left', `stagger-${(index % 4) + 1}`);
        observer.observe(item);
    });

    // Add section title animations
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in-up');
        observer.observe(title);
    });
}

// Animate Skill Progress Bars
function animateSkillProgress(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    const targetWidth = progressBar.getAttribute('data-width');
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
    }, 200);
}

// Back to Top Button
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
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
}

// Enhanced Navbar Behavior
function initEnhancedNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Contact Form Enhancement
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const formButton = form.querySelector('.btn-primary');
        const originalText = formButton.innerHTML;
        
        // Show loading state
        formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        formButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            formButton.innerHTML = '<i class="fas fa-check"></i> Đã gửi!';
            formButton.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                formButton.innerHTML = originalText;
                formButton.disabled = false;
                formButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Active Navigation Link Highlight
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize all animations and features
function initializeAnimations() {
    initTypingAnimation();
    initScrollAnimations();
    initBackToTopButton();
    initSmoothScrolling();
    initEnhancedNavbar();
    initParallaxEffect();
    initContactForm();
    initActiveNavHighlight();
}

// ========================================
// EXISTING CODE (PHASE 1 & 2)
// ========================================

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

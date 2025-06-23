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
    initPhase4Features(); // Add Phase 4 features
    initErrorHandling(); // Add error handling
    initPerformanceMonitoring(); // Add performance monitoring
}

// ========================================
// PHASE 4: PREMIUM FEATURES & DARK MODE
// ========================================

// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Update icon based on theme
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Hide all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and dot
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function startSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopSlider() {
        clearInterval(testimonialInterval);
    }
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            stopSlider();
            startSlider(); // Restart timer
        });
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
    }
    
    // Start the slider
    startSlider();
}

// Copy Email Functionality
function initCopyEmail() {
    const emailItems = document.querySelectorAll('.contact-item[data-copy]');
    
    emailItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const email = item.getAttribute('data-copy');
            
            navigator.clipboard.writeText(email).then(() => {
                // Show feedback
                const originalText = item.innerHTML;
                item.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
                item.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    item.innerHTML = originalText;
                    item.style.background = '';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show feedback
                const originalText = item.innerHTML;
                item.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
                item.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    item.innerHTML = originalText;
                    item.style.background = '';
                }, 2000);
            });
        });
    });
}

// Enhanced Blog Card Interactions
function initBlogInteractions() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize Phase 4 Features
function initPhase4Features() {
    initDarkMode();
    initScrollProgress();
    initTestimonialsSlider();
    initCopyEmail();
    initBlogInteractions();
    initLazyLoading();
}

// Error Handling & Graceful Degradation
function initErrorHandling() {
    // Handle JavaScript errors gracefully
    window.addEventListener('error', function(e) {
        console.warn('Portfolio: Non-critical error caught:', e.error);
        // Don't break the user experience for non-critical errors
        return true;
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.warn('Portfolio: Promise rejection handled:', e.reason);
        e.preventDefault();
    });
    
    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            el.classList.add('visible');
        });
    }
    
    // Fallback for browsers without CSS backdrop-filter
    if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
        document.documentElement.classList.add('no-backdrop-filter');
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor loading performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
            
            // If loading is slow, show feedback
            if (loadTime > 3000) {
                console.warn('Portfolio: Slow loading detected');
            }
        }
    });
}

// Safe initialization wrapper
function safeInit(fn, name) {
    try {
        fn();
    } catch (error) {
        console.warn(`Portfolio: Failed to initialize ${name}:`, error);
    }
}

// Update main initialization to use safe wrappers
function initializeAnimations() {
    safeInit(initTypingAnimation, 'typing animation');
    safeInit(initScrollAnimations, 'scroll animations');
    safeInit(initBackToTopButton, 'back to top button');
    safeInit(initSmoothScrolling, 'smooth scrolling');
    safeInit(initEnhancedNavbar, 'enhanced navbar');
    safeInit(initParallaxEffect, 'parallax effect');
    safeInit(initContactForm, 'contact form');
    safeInit(initActiveNavHighlight, 'active nav highlight');
    safeInit(initPhase4Features, 'Phase 4 features');
    safeInit(initErrorHandling, 'error handling');
    safeInit(initPerformanceMonitoring, 'performance monitoring');
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
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

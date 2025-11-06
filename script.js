// ============================================
// TECH-FOCUSED PORTFOLIO - INTERACTIVE FEATURES
// ============================================

// ========== Particle System ==========
function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    // Recreate particles on resize
    window.addEventListener('resize', () => {
        createParticles();
    });
}

// ========== Loading Screen ==========
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const terminalLines = document.querySelectorAll('.typing-text');
    
    if (!loadingScreen) return;
    
    let currentLine = 0;
    
    function typeLine(line) {
        return new Promise((resolve) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.display = 'inline';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(resolve, 500);
                }
            }, 50);
        });
    }
    
    async function animateLoading() {
        for (let i = 0; i < terminalLines.length; i++) {
            await typeLine(terminalLines[i]);
        }
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            initAllFeatures();
        }, 1000);
    }
    
    animateLoading();
}

// ========== Typing Animation ==========
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
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

// ========== Scroll Progress ==========
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========== Navigation ==========
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active link highlight
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
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
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ========== Live Clock ==========
function initClock() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;
    
    function updateTime() {
        const now = new Date();
        const options = {
            weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        // vi-VN format, e.g., "Thu, 06/11/2025 14:23:08"
        const formatted = now.toLocaleString('vi-VN', options).replace(',', '');
        timeElement.textContent = formatted;
        
        // Subtle tick effect
        timeElement.style.opacity = '0.85';
        requestAnimationFrame(() => { timeElement.style.opacity = '1'; });
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// ========== Theme Toggle ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

// ========== Stats Counter ==========
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ========== Skill Progress Bars ==========
function initSkillProgress() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgresses.forEach(progress => {
        skillObserver.observe(progress);
    });
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ========== Contact Form ==========
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formButton = form.querySelector('.btn-primary');
        const originalText = formButton.innerHTML;
        
        // Show loading state
        formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            formButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            formButton.style.background = 'var(--neon-green)';
            
            setTimeout(() => {
                formButton.innerHTML = originalText;
                formButton.disabled = false;
                formButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ========== Copy Email ==========
function initCopyEmail() {
    const emailItems = document.querySelectorAll('.contact-item[data-copy]');
    
    emailItems.forEach(item => {
        item.addEventListener('click', () => {
            const email = item.getAttribute('data-copy');
            
            navigator.clipboard.writeText(email).then(() => {
                const originalHTML = item.innerHTML;
                item.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                item.style.color = 'var(--neon-green)';
                
                setTimeout(() => {
                    item.innerHTML = originalHTML;
                    item.style.color = '';
                }, 2000);
            }).catch(() => {
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const originalHTML = item.innerHTML;
                item.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                item.style.color = 'var(--neon-green)';
                
                setTimeout(() => {
                    item.innerHTML = originalHTML;
                    item.style.color = '';
                }, 2000);
            });
        });
    });
}

// ========== Back to Top ==========
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
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

// ========== Glitch Effect ==========
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        }, 3000);
    });
}

// ========== Code Window Animation ==========
function initCodeWindowAnimation() {
    const codeWindow = document.querySelector('.code-window');
    if (!codeWindow) return;
    
    const codeSnippet = codeWindow.querySelector('.code-snippet');
    if (!codeSnippet) return;
    
    // Add typing effect to code
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                codeSnippet.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(codeWindow);
}

// ========== Initialize All Features ==========
function initAllFeatures() {
    initParticleSystem();
    initTypingAnimation();
    initScrollProgress();
    initNavigation();
    initClock();
    initThemeToggle();
    initStatsCounter();
    initSkillProgress();
    initScrollAnimations();
    initContactForm();
    initCopyEmail();
    initBackToTop();
    initGlitchEffect();
    initCodeWindowAnimation();
}

// ========== Error Handling ==========
window.addEventListener('error', function(e) {
    console.warn('Portfolio: Non-critical error:', e.error);
    return true;
});

window.addEventListener('unhandledrejection', function(e) {
    console.warn('Portfolio: Promise rejection:', e.reason);
    e.preventDefault();
});

// ========== Performance Monitoring ==========
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    }
});

// ========== Initialize Theme Early ==========
// Initialize theme before page loads to prevent flash
(function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon if theme toggle exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }
})();

// ========== Initialize on Load ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}
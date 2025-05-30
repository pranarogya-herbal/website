// Advanced animations and interactive effects
class AnimationController {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.animationQueue = [];
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupIntersectionObservers();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initTypewriterEffects();
        this.initParticleSystem();
        this.initMorphingElements();
        this.initTiltEffects();
        
        this.isInitialized = true;
    }

    // Intersection Observer for reveal animations
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Fade in from different directions
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Elements to animate
        const animateElements = document.querySelectorAll(`
            .section-title, .section-subtitle, .philosophy-card, 
            .product-card, .testimonial-card, .contact-item,
            .stat-item, .about-description p
        `);

        animateElements.forEach(element => {
            fadeInObserver.observe(element);
        });

        this.observers.push(fadeInObserver);
    }

    // Animate individual elements
    animateElement(element) {
        const animations = {
            'section-title': () => this.animateTitle(element),
            'philosophy-card': () => this.animateCard(element),
            'product-card': () => this.animateProductCard(element),
            'stat-item': () => this.animateStatItem(element),
            'contact-item': () => this.animateContactItem(element)
        };

        const className = Array.from(element.classList).find(cls => animations[cls]);
        if (className && animations[className]) {
            animations[className]();
        } else {
            this.defaultAnimation(element);
        }
    }

    // Title animation with text reveal
    animateTitle(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Add text glow effect
            element.style.textShadow = '0 0 20px rgba(127, 176, 105, 0.3)';
            setTimeout(() => {
                element.style.textShadow = 'none';
            }, 1000);
        }, 100);
    }

    // Card animation with stagger effect
    animateCard(element) {
        const cards = element.parentElement.querySelectorAll('.philosophy-card, .product-card');
        const index = Array.from(cards).indexOf(element);
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    }

    // Product card with image reveal
    animateProductCard(element) {
        const image = element.querySelector('.product-image img');
        const content = element.querySelector('.product-content');
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        if (image) {
            image.style.transform = 'scale(1.2)';
            image.style.opacity = '0.5';
        }
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            if (image) {
                image.style.transition = 'all 0.8s ease';
                image.style.transform = 'scale(1)';
                image.style.opacity = '1';
            }
            
            if (content) {
                content.style.animation = 'fadeInUp 0.6s ease 0.3s both';
            }
        }, 200);
    }

    // Stat item with counter animation
    animateStatItem(element) {
        const number = element.querySelector('.stat-number');
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            
            if (number) {
                this.animateCounter(number);
            }
        }, 300);
    }

    // Contact item animation
    animateContactItem(element) {
        const icon = element.querySelector('.contact-icon');
        const details = element.querySelector('.contact-details');
        
        element.style.opacity = '0';
        
        if (icon) {
            icon.style.transform = 'scale(0) rotate(180deg)';
        }
        
        if (details) {
            details.style.transform = 'translateX(20px)';
            details.style.opacity = '0';
        }
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease';
            element.style.opacity = '1';
            
            if (icon) {
                icon.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (details) {
                details.style.transition = 'all 0.6s ease 0.2s';
                details.style.transform = 'translateX(0)';
                details.style.opacity = '1';
            }
        }, 100);
    }

    // Default animation
    defaultAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    // Counter animation with easing
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count')) || 0;
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutQuint)
            const easeOut = 1 - Math.pow(1 - progress, 5);
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Scroll-triggered animations
    initScrollAnimations() {
        let ticking = false;
        
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollHandler);
    }

    updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax backgrounds
        const parallaxElements = document.querySelectorAll('.hero-bg, .philosophy-bg, .testimonials-bg');
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        // Floating elements
        const floatingElements = document.querySelectorAll('.floating-leaf');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = Math.sin(scrolled * 0.01 + index) * 20;
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    // Advanced hover effects
    initHoverEffects() {
        // Magnetic buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            this.addMagneticEffect(button);
        });

        // Card tilt effects
        const cards = document.querySelectorAll('.philosophy-card, .product-card, .testimonial-card');
        cards.forEach(card => {
            this.addTiltEffect(card);
        });

        // Image hover effects
        const images = document.querySelectorAll('.product-image img, .image-frame img');
        images.forEach(image => {
            this.addImageHoverEffect(image);
        });
    }

    // Magnetic button effect
    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const translateX = x * force * 0.3;
                const translateY = y * force * 0.3;
                
                element.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.05)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // 3D tilt effect
    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }

    // Image zoom and overlay effects
    addImageHoverEffect(image) {
        const container = image.parentElement;
        
        container.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            
            // Add overlay effect
            if (!container.querySelector('.hover-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'hover-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(79, 121, 66, 0.8), rgba(127, 176, 105, 0.6));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                `;
                container.appendChild(overlay);
            }
            
            const overlay = container.querySelector('.hover-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        container.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            
            const overlay = container.querySelector('.hover-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    }

    // Typewriter effect for text elements
    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-green)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Particle system for hero section
    initParticleSystem() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        
        heroSection.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer);
            }, i * 500);
        }
        
        // Continue creating particles
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createParticle(particleContainer);
            }
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(127, 176, 105, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        container.appendChild(particle);
        
        // Animate particle
        const duration = 8000 + Math.random() * 4000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const y = 100 - (progress * 120); // Move up and slightly beyond top
                const x = parseFloat(particle.style.left) + Math.sin(progress * Math.PI * 2) * 2;
                const opacity = 0.6 * (1 - progress);
                
                particle.style.top = y + '%';
                particle.style.left = x + '%';
                particle.style.opacity = opacity;
                
                requestAnimationFrame(animate);
            } else {
                container.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Morphing elements (logo, icons)
    initMorphingElements() {
        const morphElements = document.querySelectorAll('.card-icon svg');
        
        morphElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.2) rotate(10deg)';
                element.style.filter = 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg)';
                element.style.filter = 'none';
            });
        });
    }

    // Advanced tilt effects for special elements
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('.stat-item, .contact-item');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const rotateX = (y / rect.height) * 10;
                const rotateY = (x / rect.width) * 10;
                
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${-rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.isInitialized = false;
    }
}

// Enhanced testimonial slider with advanced transitions
class TestimonialSlider {
    constructor() {
        this.container = document.querySelector('.testimonials-slider');
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoPlayInterval = null;
        
        if (this.testimonials.length > 0) {
            this.init();
        }
    }

    init() {
        this.setupSlider();
        this.startAutoPlay();
        this.addKeyboardControls();
    }

    setupSlider() {
        this.testimonials.forEach((testimonial, index) => {
            testimonial.style.position = 'absolute';
            testimonial.style.width = '100%';
            testimonial.style.opacity = index === 0 ? '1' : '0';
            testimonial.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
            testimonial.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    transition(newIndex) {
        if (this.isTransitioning || newIndex === this.currentIndex) return;
        
        this.isTransitioning = true;
        const current = this.testimonials[this.currentIndex];
        const next = this.testimonials[newIndex];
        
        // Animate out current
        current.style.opacity = '0';
        current.style.transform = 'translateX(-100%)';
        
        // Prepare next
        next.style.opacity = '0';
        next.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            // Animate in next
            next.style.opacity = '1';
            next.style.transform = 'translateX(0)';
            
            this.currentIndex = newIndex;
            this.isTransitioning = false;
        }, 100);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.transition(nextIndex);
    }

    previous() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.transition(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previous();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.animationController = new AnimationController();
        window.testimonialSlider = new TestimonialSlider();
    }, 500);
});

// Performance monitoring
const performanceMonitor = {
    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
                }, 0);
            });
        }
    }
};

performanceMonitor.init();
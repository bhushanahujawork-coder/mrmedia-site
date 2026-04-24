/**
 * MR Media | Premium Interaction Logic
 * Optimized for performance and production.
 */

// --- PERFORMANCE WRAPPER ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothTouch: false,
        touchMultiplier: 1.5,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Mobile Menu Logic (Optimized)
    const menuTrigger = document.getElementById('mobile-menu-trigger');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = (isOpen) => {
        mobileMenu.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        isOpen ? lenis.stop() : lenis.start();
    };

    menuTrigger?.addEventListener('click', () => toggleMenu(true));
    menuClose?.addEventListener('click', () => toggleMenu(false));

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                toggleMenu(false);
                setTimeout(() => {
                    lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
                }, 400);
            }
        });
    });

    // 3. Desktop Nav Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                lenis.scrollTo(targetId, { offset: -100, duration: 1.2 });
            }
        });
    });

    // 4. AI-Powered Background (Ultra-Lightweight Particles)
    const canvas = document.getElementById('ai-background');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.15;
                this.vy = (Math.random() - 0.5) * 0.15;
                this.radius = Math.random() * 1.2;
                this.alpha = Math.random() * 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((width * height) / 30000), 100);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
    }

    // 5. GSAP Entrance & Scroll Animations (Optimized)
    gsap.registerPlugin(ScrollTrigger);

    // Hero Timeline
    const heroTl = gsap.timeline();
    heroTl.fromTo('.reveal-split', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' })
          .fromTo('.reveal-fade', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.8")
          .fromTo('.visual-card', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' }, "-=1");

    // Generic Scroll Reveals
    gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Founder Section Specifics
    gsap.from('.reveal-left', {
        x: -80, opacity: 0, duration: 1.5, ease: 'power4.out',
        scrollTrigger: { trigger: '.founder-grid', start: 'top 80%' }
    });
    gsap.from('.reveal-right', {
        x: 80, opacity: 0, duration: 1.5, ease: 'power4.out',
        scrollTrigger: { trigger: '.founder-grid', start: 'top 80%' }
    });

    // Counters
    gsap.utils.toArray('.counter-num').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            scrollTrigger: { trigger: counter, start: 'top 95%' }
        });
    });

    // CTA Scale
    gsap.from('.reveal-scale', {
        scale: 0.9, opacity: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.cta-glass-box', start: 'top 85%' }
    });

    // Navigation Scroll Effect
    const nav = document.querySelector('.nav-premium');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.9)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            nav.style.padding = '25px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.4)';
            nav.style.boxShadow = 'none';
        }
    }, { passive: true });

    // Refresh ScrollTrigger on load
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});

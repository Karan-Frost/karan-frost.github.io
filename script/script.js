document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('contextmenu', event => event.preventDefault());

    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    const header = document.getElementById('header');
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('bg-black/50', isScrolled);
        header.classList.toggle('shadow-lg', isScrolled);
        
        if (isDesktop) {
            header.classList.toggle('backdrop-blur-sm', isScrolled);
        }
    });

    if (isDesktop) {

        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];
            let mouse = { x: null, y: null };

            function setCanvasSize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.size = Math.random() * 1.5 + 0.5;
                    this.baseX = this.x;
                    this.baseY = this.y;
                    this.density = (Math.random() * 40) + 5;
                    this.color = 'rgba(139, 92, 246, 0.4)';
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }
                update() {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = 100;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = (forceDirectionX * force * this.density);
                    let directionY = (forceDirectionY * force * this.density);

                    if (distance < maxDistance) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 10;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 10;
                        }
                    }
                }
            }

            function initParticles() {
                particles = [];
                let numberOfParticles = (canvas.height * canvas.width) / 9000;
                for (let i = 0; i < numberOfParticles; i++) {
                    let x = Math.random() * canvas.width;
                    let y = Math.random() * canvas.height;
                    particles.push(new Particle(x, y));
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].draw();
                    particles[i].update();
                }
                requestAnimationFrame(animateParticles);
            }

            setCanvasSize();
            initParticles();
            animateParticles();
            canvas.style.opacity = '1';

            window.addEventListener('resize', () => {
                setCanvasSize();
                initParticles();
            });
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
            window.addEventListener('mouseout', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');

        if (cursorDot && cursorOutline) {
            let mousePos = { x: -100, y: -100 };
            let cursorPos = { dot: { x: -100, y: -100 }, outline: { x: -100, y: -100 } };
            const dotSpeed = 1;
            const outlineSpeed = 0.15;

            window.addEventListener('mousemove', (e) => {
                mousePos.x = e.clientX;
                mousePos.y = e.clientY;
            });

            function lerp(start, end, amt) {
                return (1 - amt) * start + amt * end;
            }

            function updateCursor() {
                cursorPos.dot.x = lerp(cursorPos.dot.x, mousePos.x, dotSpeed);
                cursorPos.dot.y = lerp(cursorPos.dot.y, mousePos.y, dotSpeed);
                cursorPos.outline.x = lerp(cursorPos.outline.x, mousePos.x, outlineSpeed);
                cursorPos.outline.y = lerp(cursorPos.outline.y, mousePos.y, outlineSpeed);

                cursorDot.style.transform = `translate(-50%, -50%) translate(${cursorPos.dot.x}px, ${cursorPos.dot.y}px)`;
                cursorOutline.style.transform = `translate(-50%, -50%) translate(${cursorPos.outline.x}px, ${cursorPos.outline.y}px)`;

                requestAnimationFrame(updateCursor);
            }
            updateCursor();

            const hoverElements = document.querySelectorAll('a, button, .group, .tech-icon');
            hoverElements.forEach((el) => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        }
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const techIcons = document.querySelectorAll('.tech-icon');

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            const id = entry.target.getAttribute('id');
            const currentNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                 navLinks.forEach(link => link.classList.remove('active'));
                 if(currentNavLink) currentNavLink.classList.add('active');
            }
            
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');

                if(entry.target.id === 'about') {
                    techIcons.forEach((icon, index) => {
                        setTimeout(() => {
                            icon.style.opacity = '1';
                            icon.style.transform = 'translateY(0)';
                        }, 150 * index);
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('reveal');
        sectionObserver.observe(section);
    });

});

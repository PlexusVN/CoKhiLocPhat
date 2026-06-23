// ===== PRELOADER =====
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
});

// ===== STICKY HEADER =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function toggleMenu(open) {
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    navOverlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', function () {
    toggleMenu(!navMenu.classList.contains('active'));
});

navOverlay.addEventListener('click', function () {
    toggleMenu(false);
});

document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        toggleMenu(false);
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== PROJECT SLIDER / CAROUSEL =====
const track = document.getElementById('sliderTrack');
const slides = track.querySelectorAll('.project-card');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');
const sliderContainer = document.querySelector('.slider-container');

let currentIndex = 0;
const totalSlides = slides.length;

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', function () {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

let autoSlide = setInterval(nextSlide, 5000);

track.addEventListener('mouseenter', function () { clearInterval(autoSlide); });
track.addEventListener('mouseleave', function () { autoSlide = setInterval(nextSlide, 5000); });

// Touch swipe for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderContainer.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
}, { passive: true });

createDots();

// ===== REVEAL ON SCROLL (Intersection Observer) =====
const revealElements = document.querySelectorAll(
    '.section-header, .about-content, .vision-mission, .services-grid, .strategy, ' +
    '.personnel, .equipment, .contact-content, .project-card'
);

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(function (el) {
    observer.observe(el);
});

// ===== SMOOTH SCROLL FOR HASH LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM SUBMIT HANDLER =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Đang gửi...';
    btn.disabled = true;
    setTimeout(function () {
        btn.textContent = 'Gửi thành công!';
        btn.style.background = '#27ae60';
        btn.style.borderColor = '#27ae60';
        setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
    contactForm.reset();
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current + (suffix || '');
    }, 30);
}

const personnelObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const counts = entry.target.querySelectorAll('.personnel-count');
            const targets = [];
            counts.forEach(function (el) {
                targets.push(parseInt(el.textContent));
            });
            counts.forEach(function (el, i) {
                animateCounter(el, targets[i], '');
            });
            personnelObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const personnelSection = document.querySelector('.personnel');
if (personnelSection) {
    personnelObserver.observe(personnelSection);
}

// ===== STATS COUNTER =====
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(function (el) {
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target, '');
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

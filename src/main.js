// Hero background slideshow (crossfade)
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.getElementById('heroPrev');
const heroNextBtn = document.getElementById('heroNext');
if (heroSlides.length && heroPrevBtn && heroNextBtn) {
    let heroIndex = 0;
    const heroCount = heroSlides.length;
    const HERO_MS = 4500;

    const showHeroSlide = (i) => {
        heroIndex = ((i % heroCount) + heroCount) % heroCount;
        heroSlides.forEach((slide, j) => {
            slide.classList.toggle('is-active', j === heroIndex);
        });
    };

    const heroAdvance = () => showHeroSlide(heroIndex + 1);
    let heroTimer = setInterval(heroAdvance, HERO_MS);

    const resetHeroTimer = () => {
        clearInterval(heroTimer);
        heroTimer = setInterval(heroAdvance, HERO_MS);
    };

    heroPrevBtn.addEventListener('click', () => {
        showHeroSlide(heroIndex - 1);
        resetHeroTimer();
    });
    heroNextBtn.addEventListener('click', () => {
        showHeroSlide(heroIndex + 1);
        resetHeroTimer();
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal on scroll animation
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
// Initial check
revealOnScroll();

// Form submission (prevention for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'Message Sent!';
            btn.style.background = '#1ec8b0';
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Mobile smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

console.log('BFF Bikes website loaded successfully!');

// Team Carousel
const carousel = document.getElementById('teamCarousel');
if (carousel) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = carousel.querySelectorAll('.staff-card');

    let currentIndex = 0;
    const totalCards = cards.length;

    function getCardsToShow() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    let cardsToShow = getCardsToShow();

    function createDots() {
        dotsContainer.innerHTML = '';
        const numDots = totalCards - cardsToShow + 1;
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 32; // width + gap
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % (totalCards - cardsToShow + 1);
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + (totalCards - cardsToShow + 1)) % (totalCards - cardsToShow + 1);
        updateCarousel();
    });

    // Auto-scroll
    let autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % (totalCards - cardsToShow + 1);
        updateCarousel();
    }, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            currentIndex = (currentIndex + 1) % (totalCards - cardsToShow + 1);
            updateCarousel();
        }, 5000);
    });

    window.addEventListener('resize', () => {
        const oldCardsToShow = cardsToShow;
        cardsToShow = getCardsToShow();
        if (oldCardsToShow !== cardsToShow) {
            currentIndex = 0;
            createDots();
            updateCarousel();
        }
    });

    // Initial setup
    createDots();
    updateCarousel();
}

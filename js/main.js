document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => {
        observer.observe(el);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(17, 17, 17, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            header.style.padding = '16px 0'; // Shrink padding
        } else {
            header.style.background = 'rgba(17, 17, 17, 0.8)';
            header.style.boxShadow = 'none';
            header.style.padding = '24px 0'; // Restore padding
        }

        lastScrollY = window.scrollY;
    });

    // --- Smooth Scroll for Anchor Links (with Header Offset) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Hover Effects (Optional Enhancement) ---
    // Example: Add a slight parallax or cursor effect if desired.
    // For now, CSS transitions cover the requested micro-interactions.
});

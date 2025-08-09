document.addEventListener('DOMContentLoaded', () => {
    // --- Visitor Counter Function ---
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        let count = localStorage.getItem('visitorCount');
        if (count === null) {
            count = 1;
        } else {
            count = parseInt(count, 10) + 1;
        }
        localStorage.setItem('visitorCount', count);
        visitorCountElement.textContent = count;
    }

    // --- Scroll Animation ---
    const sections = document.querySelectorAll('.content-section');
    const options = {
        root: null, // Use viewport as reference
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once shown
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Sidebar Active State Toggle ---
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', () => {
        let current = '';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

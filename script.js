document.addEventListener('DOMContentLoaded', () => {
    // --- アクセスカウンター機能 ---
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

    // --- スクロールに応じたアニメーション ---
    const sections = document.querySelectorAll('.content-section');
    const options = {
        root: null, // ビューポートを基準にする
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- サイドバーのアクティブ表示切替 ---
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

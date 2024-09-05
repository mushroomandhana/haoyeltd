// document.addEventListener('DOMContentLoaded', function () {
//     const nav = document.getElementById('nav');
//     const sections = document.querySelectorAll('.content-section');
//     const navLinks = document.querySelectorAll('.nav-link');
//     const navbarToggler = document.getElementById('navbar-toggler');
//     const navbarCollapse = document.getElementById('navbarNav');

//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 50) {
//             nav.classList.add('scrolled');
//         } else {
//             nav.classList.remove('scrolled');
//         }
//     });

//     const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.6
//     };

//     const observerCallback = (entries, observer) => {
//         entries.forEach(entry => {
//             const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
//             if (entry.isIntersecting) {
//                 navLink.classList.add('active');
//             } else {
//                 navLink.classList.remove('active');
//             }
//         });
//     };

//     const observer = new IntersectionObserver(observerCallback, observerOptions);

//     sections.forEach(section => {
//         observer.observe(section);
//     });

//     navLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();
//             const targetId = this.getAttribute('href').substring(1);
//             const targetSection = document.getElementById(targetId);
//             window.scrollTo({
//                 top: targetSection.offsetTop - 60,
//                 behavior: 'smooth'
//             });
//             navbarCollapse.classList.remove('show');
//             navbarToggler.classList.remove('collapsed');
//         });
//     });

//     navbarToggler.addEventListener('click', function () {
//         navbarCollapse.classList.toggle('show');
//         this.classList.toggle('collapsed');
//     });
// });




document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.getElementById('navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 100, // 調整偏移量為 100 像素
                behavior: 'smooth'
            });
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.remove('collapsed');

            // 手動添加active類
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
        this.classList.toggle('collapsed');
    });

    // 保留手機版選單的 active 狀態
    if (window.innerWidth <= 768) {
        navLinks.forEach(navLink => {
            navLink.addEventListener('click', function () {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            });
        });

        window.addEventListener('scroll', function () {
            let currentSectionId = '';
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) { // 調整偏移量為 100 像素
                    currentSectionId = section.getAttribute('id');
                }
            });
            navLinks.forEach(navLink => {
                if (navLink.getAttribute('href') === `#${currentSectionId}`) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        });
    }
        // 確保在頁面加載時沒有導航鏈接預設為 active
        // navLinks.forEach(navLink => navLink.classList.remove('active'));
});

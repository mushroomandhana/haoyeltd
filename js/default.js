document.addEventListener('DOMContentLoaded', function () {
    const sheetId = '1k1sLEK1KFK5l60LyldR-HyUyQkJuCh_GGPF637obgNo'; // 替換為你的Google Sheets文件
    const gids = {
        "分頁1": "1057324822", // 替換為你的分頁1的gid
        "分頁2": "1594879333", // 替換為你的分頁2的gid
        "分頁3": "577192819",  // 替換為你的分頁3的gid
        "分頁4": "107723763",  // 替換為你的分頁4的gid
        "分頁5": "925179427"   // 替換為你的分頁5的gid 
    };

    const fetchData = async (sheetId, gid) => {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        return csvText;
    };

    const parseCSV = (csvText) => {
        const rows = csvText.split('\n');
        return rows.slice(1).map(row => {
            const columns = row.split(',');
            return {
                "業主": columns[0].replace(/\\n/g, '<br>'),
                "案名": columns[1].replace(/\\n/g, '<br>')
            };
        });
    };

    const renderTable = (data, containerId) => {
        const container = document.getElementById(containerId);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const headerOwner = document.createElement('th');
        const headerProject = document.createElement('th');
        headerOwner.textContent = '業主';
        headerProject.textContent = '案名';
        headerRow.appendChild(headerOwner);
        headerRow.appendChild(headerProject);
        thead.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement('tr');
            const ownerCell = document.createElement('td');
            const projectCell = document.createElement('td');
            ownerCell.innerHTML = item.業主;
            projectCell.innerHTML = item.案名;
            row.appendChild(ownerCell);
            row.appendChild(projectCell);
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
    };

    const init = async () => {
        for (const [name, gid] of Object.entries(gids)) {
            const csvText = await fetchData(sheetId, gid);
            const data = parseCSV(csvText);
            const containerId = `projects-${name}`;
            renderTable(data, containerId);
        }
    };

    init();
});

// logo animation
function fadeInOut() {
    const image1 = document.getElementById('image1');
    let visible = false;

    function toggleVisibility() {
        if (visible) {
            image1.style.transition = 'opacity 2s';
            image1.style.opacity = 0;
        } else {
            image1.style.transition = 'opacity 2s';
            image1.style.opacity = 1;
        }
        visible = !visible;
    }

    function startAnimation() {
        toggleVisibility();
        setTimeout(() => {
            setTimeout(() => {
                toggleVisibility();
                setTimeout(startAnimation, 4000); // Pause for 4 seconds before repeating
            }, 400); // 2 seconds for fade out
        }, 7600); // Pause for 4 seconds after fade in
    }

    startAnimation();
}

window.onload = function () {
    setTimeout(fadeInOut, 3000); // Start after 2 seconds
};


// section1 description animation
document.addEventListener('DOMContentLoaded', function () {
    const descriptionDesktop = document.getElementById('description-desktop');
    const descriptionMobile = document.getElementById('description-mobile');

    function handleScroll() {
        const rectDesktop = descriptionDesktop.getBoundingClientRect();
        const rectMobile = descriptionMobile.getBoundingClientRect();

        if (rectDesktop.top < window.innerHeight && rectDesktop.bottom >= 0) {
            descriptionDesktop.classList.add('fade-in');
            descriptionDesktop.classList.remove('fade-out');
        } else {
            descriptionDesktop.classList.add('fade-out');
            descriptionDesktop.classList.remove('fade-in');
        }

        if (rectMobile.top < window.innerHeight && rectMobile.bottom >= 0) {
            descriptionMobile.classList.add('fade-in');
            descriptionMobile.classList.remove('fade-out');
        } else {
            descriptionMobile.classList.add('fade-out');
            descriptionMobile.classList.remove('fade-in');
        }
    }

    descriptionDesktop.classList.add('fade-in');
    descriptionMobile.classList.add('fade-in');

    window.addEventListener('scroll', handleScroll);
});

// fadein fade out img animation
let currentIndex = 0;
const slides = document.querySelectorAll('.kv_fade');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('kv_show');
        if (i === index) {
            slide.classList.add('kv_show');
        }
    });
}

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}, 5000); // 每5秒切換一次圖片


// Initialize the first slide
showSlide(currentIndex);

// Initialize Swiper
const initSwiper = (selector, delay) => {
    return new Swiper(selector, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: delay,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
};

const swipers = [
    { selector: ".mySwiper1", delay: 4000 },
    { selector: ".mySwiper2", delay: 5000 },
    { selector: ".mySwiper3", delay: 6000 },
    { selector: ".mySwiper4", delay: 7000 },
    { selector: ".mySwiper5", delay: 8000 },
    { selector: ".mySwiper6", delay: 9000 },
];

swipers.forEach(swiper => initSwiper(swiper.selector, swiper.delay));

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
        // threshold: [0.25]  調整為單個閾值
        // threshold: [0.2, 0.5, 0.75, 0.2]
        threshold: [0.175]
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
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
                top: targetSection.offsetTop - 75, // 調整偏移量為 100 像素
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
    navLinks.forEach(navLink => navLink.classList.remove('active'));
});


// Get the buttons
let mybutton = document.getElementById("myBtn");
let downloadButton = document.querySelector(".download_menu");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
        if (window.matchMedia("(max-width: 991px)").matches) {
            downloadButton.style.bottom = "97px"; // 上移下載按鈕
        } else {
            downloadButton.style.bottom = "112px"; // 上移下載按鈕
        }
    } else {
        mybutton.style.display = "none";
        if (window.matchMedia("(max-width: 991px)").matches) {
            downloadButton.style.bottom = "20px"; // 恢復下載按鈕位置
        } else {
            downloadButton.style.bottom = "40px"; // 恢復下載按鈕位置
        }
    }

    // Check if the user has scrolled to the bottom of the page within 300px
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) {
        downloadButton.classList.add("scrolled-to-bottom");
    } else {
        downloadButton.classList.remove("scrolled-to-bottom");
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



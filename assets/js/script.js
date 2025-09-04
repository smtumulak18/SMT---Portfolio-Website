'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
        elementToggleFunc(sidebar);
    });
}

// Close sidebar when clicking on main content (mobile only)
const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.addEventListener("click", function () {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
    select.addEventListener("click", function () {
        elementToggleFunc(this);
    });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all projects") {
            filterItems[i].classList.add("active");
        } else if (filterItems[i].dataset.category === selectedValue) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// Navigation functionality
const navItems = document.querySelectorAll('[data-nav]');
const mobileNavItems = document.querySelectorAll('[data-mobile-nav]');
const sections = document.querySelectorAll('[data-section]');

function switchSection(targetSection) {
    navItems.forEach(item => item.classList.remove('active'));
    mobileNavItems.forEach(item => item.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));

    const desktopNavItem = document.querySelector(`[data-nav="${targetSection}"]`);
    if (desktopNavItem) desktopNavItem.classList.add('active');

    const mobileNavItem = document.querySelector(`[data-mobile-nav="${targetSection}"]`);
    if (mobileNavItem) mobileNavItem.classList.add('active');

    document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');

    const navbarTitle = document.querySelector('[data-navbar-title]');
    const sectionTitles = {
        'about': 'About Me',
        'resume': 'Resume',
        'portfolio': 'Portfolio',
        'whyme': 'Why Me',
        'contact': 'Contact'
    };
    if (navbarTitle && sectionTitles[targetSection]) {
        navbarTitle.textContent = sectionTitles[targetSection];
    }
}

// Desktop navigation
navItems.forEach(navItem => {
    navItem.addEventListener('click', function () {
        const targetSection = this.getAttribute('data-nav');
        switchSection(targetSection);
    });
});

// Mobile navigation
mobileNavItems.forEach(navItem => {
    navItem.addEventListener('click', function () {
        const targetSection = this.getAttribute('data-mobile-nav');
        switchSection(targetSection);
    });
});

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// Portfolio navigation functionality
const portfolioNavItems = document.querySelectorAll('[data-portfolio-nav]');
const portfolioSections = document.querySelectorAll('[data-portfolio-section]');

portfolioNavItems.forEach(navItem => {
    navItem.addEventListener('click', function () {
        const targetSection = this.getAttribute('data-portfolio-nav');

        portfolioNavItems.forEach(item => item.classList.remove('active'));
        portfolioSections.forEach(section => section.classList.remove('active'));

        this.classList.add('active');
        document.querySelector(`[data-portfolio-section="${targetSection}"]`).classList.add('active');
    });
});

// ===== Theme Toggle Functionality =====
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Default to dark mode if nothing saved
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved/default theme
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.classList.add('active');
    themeIcon.setAttribute('data-lucide', 'moon');
} else {
    body.classList.remove('dark-theme');
    themeToggle.classList.remove('active');
    themeIcon.setAttribute('data-lucide', 'sun');
}

// ===== Toggle on Click =====
themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
    this.classList.toggle('active');

    if (body.classList.contains('dark-theme')) {
        themeIcon.setAttribute('data-lucide', 'moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.setAttribute('data-lucide', 'sun');
        localStorage.setItem('theme', 'light');
    }

    lucide.createIcons(); // Refresh Lucide icons
    resizeCanvas(); // Refresh galaxy background
    if (body.classList.contains('dark-theme')) launchShootingStar();
});


// Initialize Lucide icons
lucide.createIcons();

// Carousel functionality
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

if (carouselList) {
    carouselList.addEventListener('click', function (event) {
        const newActive = event.target.closest('.carousel__item');
        if (!newActive || newActive.dataset.pos == 0) return;
        update(newActive);
    });
}

function update(newActive) {
    const newActivePos = parseInt(newActive.dataset.pos);
    elems.forEach((item) => {
        let pos = parseInt(item.dataset.pos) - newActivePos;
        if (pos < -2) pos += elems.length;
        if (pos > 2) pos -= elems.length;
        item.dataset.pos = pos;
    });
}

// ===== Galaxy Canvas Setup (Dark & Light Mode) =====
const canvas = document.getElementById('galaxy-bg');
const ctx = canvas.getContext('2d');

let stars = [];
let nebulas = [];
let shootingStar = {
    x: -100,
    y: -100,
    dx: 0,
    dy: 0,
    active: false
};

// Check if the user is on a mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Determine if dark mode is active
function isDarkMode() {
    return document.body.classList.contains('dark-theme');
}

// Adjust canvas size on screen resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    initNebulas();
}

// Generate stars with twinkling animation
function initStars() {
    stars = [];
    const count = isMobileDevice() ? 100 : 200;
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            color: Math.random() > 0.5 ? '#1ca7ec' : '#1f2f98',
            opacity: Math.random() * 0.8 + 0.2,
            twinkle: Math.random() * 0.04 + 0.01
        });
    }
}

// Generate nebula cloud animations
function initNebulas() {
    const nebulaColors = [
        ['#1ca7ec', '#1f2f98'],
        ['#3c9ee6', '#6c73f3'],
        ['#5f6ee7', '#1f2f98'],
        ['#1ca7ec', '#3a49d1'],
        ['#4a63d1', '#1f2f98']
    ];

    nebulas = [];
    const count = isMobileDevice() ? 3 : 5;

    for (let i = 0; i < count; i++) {
        const colorSet = nebulaColors[i % nebulaColors.length];
        const baseRadius = isMobileDevice() ? 120 + Math.random() * 100 : 200 + Math.random() * 200;

        nebulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseR: baseRadius,
            colors: colorSet,
            opacity: 0.1 + Math.random() * 0.05,
            shift: Math.random() * 0.4 + 0.2,
            phase: Math.random() * Math.PI * 2,
            speed: 0.0015 + Math.random() * 0.001
        });
    }
}

// Launches a shooting star
function launchShootingStar() {
    shootingStar.x = Math.random() * canvas.width * 0.5;
    shootingStar.y = Math.random() * canvas.height * 0.5;
    shootingStar.dx = 10 + Math.random() * 5;
    shootingStar.dy = 3 + Math.random() * 2;
    shootingStar.active = true;

    setTimeout(() => shootingStar.active = false, 800);
    setTimeout(launchShootingStar, 5000 + Math.random() * 5000);
}

// Convert hex to RGB
function hexToRGB(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
}

// Draw the galaxy background
function drawGalaxy(time = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background color depending on theme
    if (isDarkMode()) {
        ctx.fillStyle = '#0a0a1a'; // dark mode stays the same
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        // Light mode: gradient background matching sidebar
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#c8dfff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.globalCompositeOperation = 'lighter';

    // Draw nebula clouds
    nebulas.forEach(nebula => {
        const wave = Math.sin(time * nebula.speed + nebula.phase);
        const radius = nebula.baseR + wave * 30;
        const offset = Math.sin(time * 0.001 + nebula.phase) * nebula.shift * 20;
        const x = nebula.x + offset;
        const y = nebula.y + offset;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${hexToRGB(nebula.colors[0])}, ${nebula.opacity})`);
        gradient.addColorStop(0.5, `rgba(${hexToRGB(nebula.colors[1])}, ${nebula.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';

    // Draw stars
    stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRGB(star.color)}, ${star.opacity})`;
        ctx.fill();
    });

    // Shooting star
    if (shootingStar.active) {
        ctx.strokeStyle = 'rgba(28,167,236,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - 60, shootingStar.y - 15);
        ctx.stroke();
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
    }

    requestAnimationFrame(drawGalaxy);
}


// Initialize Canvas
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
launchShootingStar();
drawGalaxy();


// ===== DOM Loaded: Init Nav, Splash, and Scroll Logic =====
document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splash");
    const sidebar = document.querySelector("aside.sidebar");
    const home = document.querySelector(".main-content");
    const mobileNav = document.querySelector(".mobile-bottom-nav");

    setTimeout(() => {
        splash.classList.add("zoom-blur-out");

        setTimeout(() => {
            splash.style.display = "none";

            if (sidebar) sidebar.classList.add("visible");
            if (home) home.classList.add("visible");

            if (mobileNav) {
                mobileNav.style.display = "flex"; // first show layout
                requestAnimationFrame(() => {
                    mobileNav.classList.add("visible"); // then fade in
                });
            }

        }, 1000);
    }, 2500);
});


document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector('.sidebar-content');

    sidebar.addEventListener("scroll", () => {
        const maxScroll = sidebar.scrollHeight - sidebar.clientHeight;

        if (sidebar.scrollTop <= 0) {
            sidebar.style.transform = "translateY(20px)";
            setTimeout(() => sidebar.style.transform = "translateY(0)", 150);
        }
        if (sidebar.scrollTop >= maxScroll) {
            sidebar.style.transform = "translateY(-20px)";
            setTimeout(() => sidebar.style.transform = "translateY(0)", 150);
        }
    });
});

        // ===== Modal JS =====
        const modal = document.getElementById('coffeeModal');
        const btn = document.getElementById('buyCoffeeBtn');
        const closeBtn = modal.querySelector('.close-btn');

        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
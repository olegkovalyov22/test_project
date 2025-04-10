// === ТЁМНАЯ ТЕМА | СВЕТЛАЯ ТЕМА ===
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Проверка темы ОС и установка её, если пользователь не менял вручную
    if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add("dark-theme");
        }
    } else {
        // Если тема уже выбрана вручную, применить её
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-theme");
        }
    }

    // Переключение темы при клике на кнопку
    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-theme");

        // Сохраняем выбор в localStorage
        if (body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

// === LAZY LOADING ===
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".lazy-section");
    const images = document.querySelectorAll(".lazy-img");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("loaded");

                // Для изображений <img>
                if (entry.target.tagName === "IMG" && entry.target.dataset.src) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.classList.add("loaded");
                }

                observer.unobserve(entry.target); // Остановить наблюдение после загрузки
            }
        });
    });

    sections.forEach(section => observer.observe(section));
    images.forEach(img => observer.observe(img));
});




// === H E A D E R ===
document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header"),
        headInner = document.getElementById("head-inner"),
        logoHead = document.getElementById("logo-head"),
        navToggle = document.getElementById("nav-toggle"),
        navTogItem = document.getElementById("nav-tog-item"),
        navbar = document.getElementById("navbar"),
        intro = document.getElementById("intro"),
        navLinks = document.querySelectorAll(".nav__link"),
        navLink1 = document.getElementById("navlin1"),
        navLink2 = document.getElementById("navlin2"),
        navLink3 = document.getElementById("navlin3"),
        buttonToggle = document.getElementById("theme-toggle"),
        sections = document.querySelectorAll(".sect");

    let introHeight = intro.offsetHeight;
    let scrollOffset = window.scrollY;

// Header -> fixed header
    checkScroll(scrollOffset);

    window.addEventListener("scroll", function () {
        scrollOffset = window.scrollY;
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introHeight) {
            header.classList.add("fixed");
            headInner.classList.add("change");
            navToggle.classList.add("fixed");
            navTogItem.classList.add("change");
            logoHead.classList.add("active");
            navLink1.classList.add("change");
            navLink2.classList.add("change");
            navLink3.classList.add("change");
            buttonToggle.classList.add("change");
        } else {
            header.classList.remove("fixed");
            headInner.classList.remove("change");
            navToggle.classList.remove("fixed");
            navTogItem.classList.remove("change");
            logoHead.classList.remove("active");
            navLink1.classList.remove("change");
            navLink2.classList.remove("change");
            navLink3.classList.remove("change");
            buttonToggle.classList.remove("change");
        }
    }

// Header -> smooth scroll
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const blockId = this.getAttribute("data-scroll");
            const blockOffset = document.querySelector(blockId).offsetTop;

            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            window.scrollTo({
                top: blockOffset,
                behavior: "smooth"
            });
        });
    });

// Header -> Menu nav toggle OPEN
    navToggle.addEventListener("click", function (event) {
        event.preventDefault();

        this.classList.toggle("active");
        navbar.classList.toggle("active");
    });

// Header -> Menu nav toggle CLOSE -> сворачивание после выбора "пути"
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            navbar.classList.remove("active");
            navToggle.classList.remove("active");
        });
    });

// Header -> active link (Intersection Observer)
    const observerOptions = {
        root: null,
        threshold: 0.15, // 15% секции в видимой области
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

});
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
        header.classList.toggle("active");
        logoHead.classList.toggle("change");
    });

// Header -> Menu nav toggle CLOSE -> сворачивание после выбора "пути"
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            header.classList.remove("active");
            logoHead.classList.remove("change");
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





    

// ===  F o n t   s i z e  ===

// body -> stretch font size
    function autoResizeText() {
        const elements = document.querySelectorAll('.stretch');
      
        elements.forEach(el => {
        //   let fontSize = 80; // стартовое значение
        let fontSize = parseInt(el.dataset.startFont) || 80; // стартовое значение
        el.style.fontSize = fontSize + 'px';
    
        const maxWidth = el.clientWidth;
        const maxHeight = el.clientHeight;
    
        while ((el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) && fontSize > 5) {
            fontSize--;
            el.style.fontSize = fontSize + 'px';
        }
        });
    }
    
    window.addEventListener('load', autoResizeText);
    window.addEventListener('resize', autoResizeText); // чтобы подстраивалось при изменении размера окна

});




// ===  F O R M  ===

// Form -> error checking, validation

document.addEventListener("DOMContentLoaded", () => {
// === 1. Плавное появление формы при прокрутке ===
    const formEl = document.querySelector('.form');

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('form-visible');
        }
    });
    }, { threshold: 0.2 });

    observer.observe(formEl);

    // === 2. Валидация формы с кастомной подсветкой ошибок ===
    formEl.addEventListener('submit', function(e) {
    e.preventDefault(); // Остановим отправку формы сначала

    let hasError = false;

    // Сброс возможных предыдущих ошибок
    this.querySelectorAll('.error-message').forEach(msg => msg.remove());
    this.querySelectorAll('.form-data, .checkbox').forEach(field => {
        field.classList.remove('shake');
        field.classList.remove('error');
    });

    // Имя
    const nameInput = this.querySelector('input[name="name"]');
    const name = nameInput.value.trim();
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s'-]+$/; // можно и и пробелы

    if (!name) {
    showError(nameInput, 'Please enter your name');
    hasError = true;
    } else if (!nameRegex.test(name)) {
    showError(nameInput, 'Name should not contain numbers or symbols');
    hasError = true;
    }

    // Email
    const emailInput = this.querySelector('input[name="email"]');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Please enter a valid email');
        hasError = true;
    }

    // Чекбокс
    const checkboxInput = this.querySelector('input[name="privacy"]');
    if (!checkboxInput.checked) {
        showError(checkboxInput, 'Please accept the privacy policy');
        hasError = true;
    }

    // Если нет ошибок — можно отправлять
    if (!hasError) {
        // можно добавить отправку формы через AJAX или просто this.submit()
        console.log('Форма отправлена!');
        this.submit();
    }
    });

    // === 3. Функция показа ошибок и анимации shake ===
    function showError(inputEl, message) {
    inputEl.classList.add('error', 'shake');

    // Создать элемент с текстом ошибки
    const msg = document.createElement('div');
    msg.className = 'error-message';
    msg.textContent = message;

    // Размещение ошибки — под полем
    if (inputEl.type === 'checkbox') {
        inputEl.closest('.form-checkbox').appendChild(msg);
    } else {
        inputEl.parentElement.appendChild(msg);
    }

    // Удалить shake-класс через 500мс, чтобы он не зависал
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    }


// form -> submitting form

    formEl.addEventListener('submit', function(e) {
        e.preventDefault(); // стандартная отправка
      
        let hasError = false;
      
        // 
      
        if (!hasError) {
          const formData = new FormData(this);
      
          fetch('https://example.com/send', { // <-- вставить адрес
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (response.ok) {
              alert('Форма успешно отправлена!');
              formEl.reset(); // Очистить форму
            } else {
              alert('Ошибка при отправке формы.');
            }
          })
          .catch(error => {
            alert('Произошла ошибка: ' + error);
          });
        }
      });
      
});




// ===  I N T R O  ===

// intro -> error checking, validation

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll(
                '.intro__title, .intro__subtitle, .intro__line, .intro__btn'
                );

                elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-fade-in-right');
                }, index * 200); // задержка между элементами
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const lazySection = document.querySelector('.lazy-section');
    if (lazySection) {
        observer.observe(lazySection);
    }  
});


'use strict'
document.addEventListener("DOMContentLoaded", () => {

   /* 4. Создание слайдер-карусели отзывов главной страницы. */

   const reviews = document.querySelector('.reviews__list');       // создаем переменную находя блок по классу

   if (reviews) {                                           // проверяем существование элемента в DOM
       console.log('Константа reviews существует');

       /* 
       *   Алгоритм
       *
       *   1. Начало.
       *   2. Просмотр трех отзывов одновременно (создание переменной, которая не будет меняться).
       *   3. Проверка условия (ожидание клика на нажатие на стрелку): если отзывы прокручиваются.
       *       3.1. Да: Получаем 3 новых отзыва от пользователей сайта (создание переменной, которая будет меняться).
       *       3.2. Нет: Конец
       *   4. Конец
       * 
       *   Блок-схема: /images/block-schema.png
       */
    let currentIndex = 0; //индекс карточек
    const slider = document.querySelectorAll(".item-reviews__text");
    const prevButton = document.querySelector(".reviews__button-left");
    const nextButton = document.querySelector(".reviews__button-right");
    const visibleCards = 3; //количество отображаемых карточек
    updateSlider();
    //
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 3;
        } else {
            currentIndex = slider.length - visibleCards; // Переход к последним карточкам
        }
        updateSlider();
    });
    //
    nextButton.addEventListener("click", () => {
        if (currentIndex < slider.length - visibleCards) {
            currentIndex = currentIndex + 3;
        } else {
            currentIndex = 0; // Переход к началу карточек
        }
        updateSlider();
    });
    function updateSlider() {
        slider.forEach((item, index) => {
            // Проверяем, нужно ли показывать карточку
            if (index >= currentIndex && index < currentIndex + visibleCards) {
                item.style.display = 'block'; // Показываем карточку
            } else {
                item.style.display = 'none'; // Скрываем карточку
            }
        });
    }
    }
});

    // 5. Динамическая загрузка списка новостей из массива объектов и отображения их на главной странице.

   /* Лекция 4 */
    
    // const cardsContainer = document.querySelector('#cards');

    // if (cardsContainer) {

    //     const dataTitleCards = ['Дни рождения клиники', 'Наша учеба', 'Приглашаем студентов на практику'];

    //     const titleCards = cardsContainer.querySelectorAll('.item-news__title');

    //     // console.log(titleCards); // проверка в консоли

    //     titleCards.forEach((item, index) => {
    //         item.textContent = dataTitleCards[index];
    //     });

    // }

    /* Лекция 5 */
    
    // const cardsContainer = document.querySelector('#cards');
    // if (cardsContainer) {
    //     const cardList = cardsContainer.querySelector('.news__list');

    //     /* Моковые данные */
    //     const cardsData = {
    //         card1: {
    //             title: 'Дни рождения клиники',
    //             description: '25 марта наша клиника празднует день рождения',
    //             image: 'images/happy-birthday.png',
    //             imageWidth: 80,
    //             imageHeight: 80,
    //             imageAlt: 'C днем рождения',
    //             link: '/#/'    
    //         },
    //         card2: {
    //             title: 'Наша учеба',
    //             description: 'Галина Семеновна начала проходить дополнительные курсы',
    //             image: 'images/courses.png',
    //             imageWidth: 80,
    //             imageHeight: 80,
    //             imageAlt: 'Прохождение доп.курсов',
    //             link: '/#/'   
    //         },
    //         card3: {
    //             title: 'Приглашаем студентов на практику',
    //             description: 'Не знаете где пройти практику? Мы поможем вам с выбором!',
    //             image: 'images/practice.png',
    //             imageWidth: 80,
    //             imageHeight: 80,
    //             imageAlt: 'Практика студентов',
    //             link: '/#/'   
    //         }
    //     }
    //     // Функция для создания карточки
    //     const createCard = (title, description, imageUrl, imageWidth, imageHeight, imageAlt, linkUrl) => {
    //         const card = `
    //             <li class="news__item item_news">
    //                 <h3 class="item-news__title">${title}</h3>
    //                 <div class="item-news__text">
    //                     <p class="news__item-text">${description}</p>
    //                     <img class="item-news__image" src="${imageUrl}" width="${imageWidth}" height="${imageHeight}" alt="${imageAlt}">
    //                     <a class="item-news_link" href="${linkUrl}">Читать дальше</a>
    //                 </div>
    //             </li>
    //         `; 

    //         return card;
    //     }

    //     for (const cardKey in cardsData) {
    //         const card = cardsData[cardKey];
 
    //         const cardElement = createCard(card.title, card.description, card.image, card.imageWidth, card.imageHeight, card.imageAlt, card.link);
    //         cardList.insertAdjacentHTML('beforeend', cardElement);
    //     }
    // }

    /* Лекция 6 */
    const cardsContainer = document.querySelector('#cards');
    if (cardsContainer) {
        const cardList = cardsContainer.querySelector('.news__list');

        // Пример URL для получения данных с сервера
        const apiUrl = 'data.json';

        // Функция для создания карточки
        const createCard = (title, description, imageUrl, imageWidth, imageHeight, imageAlt, linkUrl) => {

            // Шаблонные строки и подстановки
            const card = `
                <li class="news__item item_news">
                    <h3 class="item-news__title">${title}</h3>
                    <div class="item-news__text">
                        <p class="news__item-text">${description}</p>
                        <img class="item-news__image" src="${imageUrl}" width="${imageWidth}" height="${imageHeight}" alt="${imageAlt}">
                        <a class="item-news_link" href="${linkUrl}">Читать дальше</a>
                    </div>
                </li>
            `;

            return card;
        }

        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof (data)); // Тип полученных данных

                data.forEach(text => {
                    const cardElement = createCard(text.title, text.description, text.image, text.imageWidth, text.imageHeight, text.imageAlt, text.link);
                    cardList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }

    /* 7. Появление форм */

    const loginHeaderButton = document.querySelector('.header__login');
    const dialogLayout = document.querySelector('.dialog');

    if (loginHeaderButton && dialogLayout) {
        const closeDialogButtons = dialogLayout.querySelectorAll('[data-close]');
        const selectPopup = dialogLayout.querySelector('#popup-select');
        const loginPopup = dialogLayout.querySelector('#popup-login');
        const registrationPopup = dialogLayout.querySelector('#popup-registration');
        const switchToRegisterButtons = dialogLayout.querySelectorAll('[data-registration]');
        const switchToLoginButtons = dialogLayout.querySelectorAll('[data-login]');

        // Открытие модального окна при клике на кнопку "Войти"
        loginHeaderButton.addEventListener('click', () => {
            dialogLayout.removeAttribute('hidden');
        });

        // Закрытие модального окна при клике на кнопку закрытия
        if (closeDialogButtons) {
            closeDialogButtons.forEach(button => {
                button.addEventListener('click', () => {
                    dialogLayout.setAttribute('hidden', true);
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                });
            });
        }

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === dialogLayout) {
                dialogLayout.setAttribute('hidden', true);
                selectPopup.removeAttribute('hidden');
                loginPopup.setAttribute('hidden', true);
                registrationPopup.setAttribute('hidden', true);
            }
        });

        // Переключение на форму регистрации
        if (registrationPopup) {
            switchToRegisterButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.removeAttribute('hidden');
                });
            });
        }

        // Переключение на форму входа
        if (loginPopup) {
            switchToLoginButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                    loginPopup.removeAttribute('hidden');

                    // Проверяем, есть ли сохраненный логин в localStorage
                    if (localStorage.getItem('login')) {
                        // Находим поле ввода логина
                        const loginField = document.querySelector('#userlogin');

                        // Устанавливаем значение поля из localStorage
                        loginField.value = localStorage.getItem('login');
                    }
                });
            });
        }

        // Отправка данных на форме регистрации
        registrationPopup.addEventListener('submit', event => {
            event.preventDefault(); // Предотвращаем отправку формы

            const username = registrationPopup.querySelector('#username').value;
            const login = registrationPopup.querySelector('#login').value;
            const email = registrationPopup.querySelector('#email').value;
            const password = registrationPopup.querySelector('#password').value;
            const confirmPassword = registrationPopup.querySelector('#confirm-password').value;

            const errorMessage = registrationPopup.querySelector('#error-message');

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.style.color = 'red';
                return;
            }

            if (username.length < 3) {
                errorMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
                return;
            }

            if (password.length < 8) {
                errorMessage.textContent = 'Пароль должен содержать не менее 8 символов';
                return;
            }

            // Здесь можно добавить отправку данных на сервер
            errorMessage.textContent = 'Регистрация прошла успешно!';
            errorMessage.style.color = 'green';

            // Запишем логин
            window.localStorage.setItem("login", login);

            // Очистка формы
            document.getElementById('registration-form').reset();
        });

        loginPopup.addEventListener('submit', event => {
            event.preventDefault(); // Предотвращаем отправку формы

            const loginField = loginPopup.querySelector('#userlogin').value;
            const passwordField = loginPopup.querySelector('#userpassword').value;

            const errorMessage = loginPopup.querySelector('#error-message-login');

            const users = {
                'test': '12345678',
                'student': '0987654321',
            }

            if (users.hasOwnProperty(loginField) && users[loginField] === passwordField) {
                // Здесь можно добавить отправку данных на сервер
                errorMessage.textContent = 'Вход выполнен успешно';
                errorMessage.style.color = 'green';

                loginHeaderButton.remove();

                const userHeader = `
                    <span class="header__user">Пользователь: ${loginField}</span>
                    `;

                header.insertAdjacentHTML('beforeend', userHeader);

                setTimeout(() => {
                    dialogLayout.setAttribute('hidden', true);
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);

                    document.getElementById('login-form').reset();
                }, 3000);
            } else {
                errorMessage.textContent = 'Пользователь с таким логином и паролем не найден!';
                errorMessage.style.color = 'red';
            }
        });
    }

    // Preloader страницы

    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }

     // Карусель (слайдер)
     const slider = document.querySelector('.swiper');

     if (slider) {
         const swiper = new Swiper(slider, {
             // Дополнительные параметры
             slidesPerView: 3, // Количество слайдов на экране
             spaceBetween: 30, // Расстояние между слайдами
             loop: true,  // Зацикливание слайдов
 
             // Пагинация
             pagination: {
                 el: '.swiper-pagination',
             },
 
             // Навигационные стрелки
             navigation: {
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
             },
         });
     }
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

    /* 7. Появление форм */

    const loginHeaderButton = document.querySelector('.header__login');
    const dialogLayout = document.querySelector('.dialog');

    if (loginHeaderButton && dialogLayout) {
        const closeDialogButton = dialogLayout.querySelector('.popup__close');
        const selectPopup = dialogLayout.querySelector('#popup-select');
        const loginPopup = dialogLayout.querySelector('#popup-login');
        const registrationPopup = dialogLayout.querySelector('#popup-registration');
        const switchToRegister = selectPopup.querySelector('[data-registration]');
        const switchToLogin = selectPopup.querySelector('[data-login]');

        // Открытие модального окна при клике на кнопку "Войти"
        loginHeaderButton.addEventListener('click', () => {
            dialogLayout.removeAttribute('hidden');
        });

        // Закрытие модального окна при клике на кнопку закрытия
        closeDialogButton.addEventListener('click', () => {
            dialogLayout.setAttribute('hidden', true);
        });

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === dialogLayout) {
                dialogLayout.setAttribute('hidden', true);
            }
        });

        // Переключение на форму регистрации
        if (registrationPopup) {
            switchToRegister.addEventListener('click', (event) => {
                event.preventDefault();
                selectPopup.setAttribute('hidden', true);
                loginPopup.setAttribute('hidden', true);
                registrationPopup.removeAttribute('hidden');
            });
        }

        // Переключение на форму входа
        if (loginPopup) {
            switchToLogin.addEventListener('click', (event) => {
                event.preventDefault();
                selectPopup.setAttribute('hidden', true);
                registrationPopup.setAttribute('hidden', true);
                loginPopup.removeAttribute('hidden');
            });
        }
    }
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    let isForward = true; // Направление прокрутки: true - вперёд, false - назад

    // Функция для переключения карточек
    const moveCarousel = (direction) => {
        const cardWidth = document.querySelector('.carousel-item').clientWidth;
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % carouselInner.children.length;
        } else {
            currentIndex = (currentIndex - 1 + carouselInner.children.length) % carouselInner.children.length;
        }
        carouselInner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    // Автоматическая прокрутка
    const autoScroll = () => {
        if (isForward) {
            moveCarousel('next');
            // Если достигли конца, меняем направление
            if (currentIndex === carouselInner.children.length - 1) {
                isForward = false;
            }
        } else {
            moveCarousel('prev');
            // Если достигли начала, меняем направление
            if (currentIndex === 0) {
                isForward = true;
            }
        }
    };

    // Запуск автоматической прокрутки
    let autoScrollInterval = setInterval(autoScroll, 500); // Интервал

    // Остановка автоматической прокрутки при наведении на карусель
    carouselInner.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновление автоматической прокрутки при уходе курсора
    carouselInner.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(autoScroll, 500);
    });

    // Обработчики для кнопок
    prevButton.addEventListener('click', () => {
        moveCarousel('prev');
        isForward = false; // Меняем направление на "назад"
        clearInterval(autoScrollInterval); // Сброс интервала при ручном переключении
        autoScrollInterval = setInterval(autoScroll, 500); // Перезапуск интервала
    });

    nextButton.addEventListener('click', () => {
        moveCarousel('next');
        isForward = true; // Меняем направление на "вперёд"
        clearInterval(autoScrollInterval); // Сброс интервала при ручном переключении
        autoScrollInterval = setInterval(autoScroll, 500); // Перезапуск интервала
    });
});
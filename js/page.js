'use strict';

(function () {
  var isActivePage = false;
  var mapPinMain = document.querySelector('.map__pin--main');

  // Деактивация страницы
  var deactivatePage = function () {

    // Флаг страница не активна
    isActivePage = false;

    // Добавляем координаты главного пина на неактивной странице
    window.form.setAddressField(isActivePage);

    // Деактивируем форму
    window.form.сhangeAdFormState(isActivePage);

    // Удаляем обработчиков на форму
    window.form.removeListenersToAdForm();

    // Удаляем обработчики событий карты
    window.card.removeMapListeners();
  };

  // Активация страницы
  var activatePage = function () {

    // Флаг страница активна
    window.form.isActivePage = true;

    // Добавляем координаты главного пина на неактивной странице
    window.form.setAddressField(isActivePage);

    // Активируем форму
    window.form.сhangeAdFormState(isActivePage);

    // Добавления обработчиков на форму
    window.form.addListenersToAdForm();

    // Показываем карту
    document.querySelector('.map').classList.remove('map--faded');

    // Показываем метки
    window.pin.createMapElements();

    // Добавляем обработчики событий карты
    window.card.addMapListeners();
  };

  // При загрузке, страница должна быть не активна поэтому вызываем функцию
  deactivatePage();

  // Обработчик по клику мышки на главный пин
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.card.LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  });

  // Обработчик нажатие клавиши "Enter" на главном пине
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.card.ENTER_KEY) {
      activatePage();
    }
  });

})();

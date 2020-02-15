'use strict';

(function () {
  var onFirstClickMainPin = function (evt) {
    if (evt.button === window.card.LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  };

  var onFirstKeydownMainPin = function (evt) {
    if (evt.key === window.card.ENTER_KEY) {
      activatePage();
    }
  };

  // Вешаем обработчик на главный пин
  var addListenersToMainPin = function () {
    window.form.mainPin.addEventListener('mousedown', onFirstClickMainPin);
    window.form.mainPin.addEventListener('keydown', onFirstKeydownMainPin);
  };

  // Удаляем обработчик на главный пин
  var removeListenersToMainPin = function () {
    window.form.mainPin.removeEventListener('mousedown', onFirstClickMainPin);
    window.form.mainPin.removeEventListener('keydown', onFirstKeydownMainPin);
  };

  // Деактивация страницы
  var deactivatePage = function () {
    // Добавляем координаты главного пина на неактивной странице
    window.form.setAddressField(false);

    // Деактивируем форму
    window.form.сhangeAdFormState(false);

    // Удаляем обработчиков на форму
    window.form.removeListenersToAdForm();

    // Удаляем обработчики событий карты
    window.card.removeMapListeners();

    // Вешаем обработчики на главный пин
    addListenersToMainPin();

    // Вешаем обработчик перетаскивания главного пина
    // window.movement.addListenersToMainPinMove();
  };

  // Активация страницы
  var activatePage = function () {
    // Добавляем координаты главного пина на неактивной странице
    window.form.setAddressField(true);

    // Активируем форму
    window.form.сhangeAdFormState(true);

    // Добавления обработчиков на форму
    window.form.addListenersToAdForm();

    // Показываем карту
    document.querySelector('.map').classList.remove('map--faded');

    // Показываем метки
    window.pin.createMapElements();

    // Добавляем обработчики событий карты
    window.card.addMapListeners();

    // Удаляем обработчики на главном пине после первого нажатия на него
    removeListenersToMainPin();

    // Вешаем обработчик перетаскивания главного пина
    window.movement.addListenersToMainPinMove();
  };

  // При загрузке, страница должна быть не активна поэтому вызываем функцию
  deactivatePage();

})();

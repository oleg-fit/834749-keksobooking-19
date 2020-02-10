'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  var mapPinMain = document.querySelector('.map__pin--main');
  var isActivePage = false;

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormTextareas = adForm.querySelectorAll('textarea');
  var adFormButtons = adForm.querySelectorAll('button');

  // Функция добавляет атрибуты disabled
  var addAttributeAdFormElements = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].setAttribute('disabled', 'disabled');
    }
  };

  // Функция удаляет атрибуты disabled
  var removeAttributeAdFormElements = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].removeAttribute('disabled', 'disabled');
    }
  };

  // Деактивация страницы
  var deactivatePage = function () {

    // Деактивируем форму
    addAttributeAdFormElements(adFormInputs);
    addAttributeAdFormElements(adFormSelects);
    addAttributeAdFormElements(adFormTextareas);
    addAttributeAdFormElements(adFormButtons);

    isActivePage = false;
  };

  deactivatePage();
  window.form.setAddressField();

  // Активация страницы
  var activatePage = function () {

    // Показываем карту
    document.querySelector('.map').classList.remove('map--faded');

    // Показываем метки
    window.fotm.createMapElements();

    // Активируем форму
    adForm.classList.remove('ad-form--disabled');
    removeAttributeAdFormElements(adFormInputs);
    removeAttributeAdFormElements(adFormSelects);
    removeAttributeAdFormElements(adFormTextareas);
    removeAttributeAdFormElements(adFormButtons);

    isActivePage = true;
    window.form.setAddressField();
  };

  // Проверка на нажатие левой кнопки мыши
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  });

  // Проверка на нажатие улавиши "Enter"
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  });

  window.page = {
    isActivePage: isActivePage
  };
})();

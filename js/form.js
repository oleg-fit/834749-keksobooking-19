'use strict';

(function () {
  var MAIN_PIN_INACTIVE_RADIUS = 32;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 86;

  var adForm = document.querySelector('.ad-form');
  var adFormButtonSubmit = adForm.querySelector('.ad-form__submit');
  var adFormSelectRoomNumber = adForm.querySelector('#room_number');
  var adFormSelectRoomCapacity = adForm.querySelector('#capacity');
  var adFormInputTitle = adForm.querySelector('#title');
  var adFormInputPrice = adForm.querySelector('#price');
  var adFormSelectType = adForm.querySelector('#type');
  var adFormSelectTime = adForm.querySelector('.ad-form__element--time');
  var adFormselectTimein = adForm.querySelector('#timein');
  var adFormselectTimeout = adForm.querySelector('#timeout');
  var adFormSelectDescription = adForm.querySelector('#description');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var adFormFieldAddress = adForm.querySelector('#address');
  var adFormAllFieldset = adForm.querySelectorAll('fieldset');
  var adFormAllFeatures = adForm.querySelectorAll('.feature__checkbox');

  var mainPin = document.querySelector('.map__pin--main');

  // Функция добавляет атрибуты disabled
  var addAttributeFormElements = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].setAttribute('disabled', 'disabled');
    }
  };

  // Функция удаляет атрибуты disabled
  var removeAttributeFormElements = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция активирует поля формы
  var activateAdForm = function () {
    removeAttributeFormElements(adFormAllFieldset);
  };

  // Функция деактивирует поля формы
  var deactivateAdForm = function () {
    addAttributeFormElements(adFormAllFieldset);
  };

  // Фунция для изменения состояния формы
  var сhangeAdFormState = function (state) {
    if (state) {
      activateAdForm();
      adForm.classList.remove('ad-form--disabled');
    } else {
      deactivateAdForm();
      adForm.classList.add('ad-form--disabled');
    }
    adFormFieldAddress.setAttribute('readonly', 'readonly');
  };

  // Заполняет поле адреса
  var setAddressField = function (state) {
    if (state) {
      adFormFieldAddress.value = (mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_HEIGHT);
    } else {
      adFormFieldAddress.value = (mainPin.offsetLeft + MAIN_PIN_INACTIVE_RADIUS) + ', ' + (mainPin.offsetTop + MAIN_PIN_INACTIVE_RADIUS);
    }
  };

  // Валидация поля заголовка
  var validateAdFormInputTitle = function () {
    if (adFormInputTitle.validity.tooShort) {
      adFormInputTitle.setCustomValidity('Заголовок объявления должен содержать не менее 30 символов');
    } else if (adFormInputTitle.validity.tooLong) {
      adFormInputTitle.setCustomValidity('Заголовок объявления должен содержать не более  100 символов');
    } else if (adFormInputTitle.validity.valueMissing) {
      adFormInputTitle.setCustomValidity('Обязательное поле');
    } else {
      adFormInputTitle.setCustomValidity('');
    }
  };

  // Валидация поля цена
  var validateAdFormInputPrice = function () {
    var minPrice = parseInt(adFormInputPrice.min, 10);
    var maxPrice = parseInt(adFormInputPrice.max, 10);

    if (adFormInputPrice.value < minPrice) {
      adFormInputPrice.setCustomValidity('Цена за ночь не может быть меньше чем ' + minPrice);
    } else if (adFormInputPrice.value > 1000000) {
      adFormInputPrice.setCustomValidity('Цена за ночь не может быть больше чем ' + maxPrice);
    } else if (adFormInputPrice.validity.valueMissing) {
      adFormInputPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormInputPrice.setCustomValidity('');
    }
  };

  // Проверка цены за ночь по типу жилья
  var validateAdFormInputPriceAndType = function () {
    var minPrice = 0;
    switch (adFormSelectType.value) {
      case ('bungalo'):
        minPrice = 0;
        break;
      case ('flat'):
        minPrice = 1000;
        break;
      case ('house'):
        minPrice = 5000;
        break;
      case ('palace'):
        minPrice = 10000;
        break;
    }
    adFormInputPrice.min = minPrice;
    adFormInputPrice.placeholder = minPrice;
    validateAdFormInputPrice();
  };

  // Валидация полей "Количество комнат" и "Количество мест"
  var validateAdFormCapacity = function () {
    var rooms = parseInt(adFormSelectRoomNumber.value, 10);
    var capacity = parseInt(adFormSelectRoomCapacity.value, 10);

    if (rooms === 1 && capacity !== 1) {
      adFormSelectRoomNumber.setCustomValidity('В 1-ой комнате может быть только 1 гость');
    } else if (rooms === 2 && (capacity < 1 || capacity > 2)) {
      adFormSelectRoomNumber.setCustomValidity('В 2-х комнатах может от 1 до 2-х гостей');
    } else if (rooms === 3 && (capacity < 1 || capacity > 3)) {
      adFormSelectRoomNumber.setCustomValidity('В 3-х комнатах может быть от 1 до 3-х гостей');
    } else if (rooms === 100 && capacity !== 0) {
      adFormSelectRoomNumber.setCustomValidity('В 100 комнатах не может быть гостей');
    } else {
      adFormSelectRoomNumber.setCustomValidity('');
    }
  };

  // Обработчик поля "Заголовка объявления"
  var onAdFormInputTitle = function () {
    validateAdFormInputTitle();
  };

  // Обработчик поля "Тип жилья"
  var onAdFormTypeChange = function () {
    validateAdFormInputPriceAndType();
  };

  // Обработчик поля "Цена за ночь, руб."
  var onAdFormPriceInput = function () {
    validateAdFormInputPriceAndType();
  };

  // Обработчик поля "Количество комнат"
  var onAdFormSelectRoomChange = function () {
    validateAdFormCapacity();
  };

  // Обработчик поля "Количество мест"
  var onAdFormSelectCapacityChange = function () {
    validateAdFormCapacity();
  };

  // Обработчик полей "Время заезда и выезда"
  var onAdFormTimeChange = function (evt) {
    if (evt.target === adFormselectTimein) {
      adFormselectTimeout.value = adFormselectTimein.value;
    } else if (evt.target === adFormselectTimeout) {
      adFormselectTimein.value = adFormselectTimeout.value;
    }
  };

  // Обработчик полей "Количество комнат" и "Количество мест"
  var onAdFormGuestChange = function () {
    var сapacityOptions = adFormSelectRoomCapacity.querySelectorAll('option');

    adFormSelectRoomCapacity.value = '1';

    if (+adFormSelectRoomNumber.value === 1) {
      removeAttributeFormElements(сapacityOptions);

      for (var j = 0; j < сapacityOptions.length; j++) {
        if (j !== 2) {
          сapacityOptions[j].setAttribute('disabled', 'disabled');
        }
      }

    } else if (+adFormSelectRoomNumber.value === 2) {
      removeAttributeFormElements(сapacityOptions);

      for (var k = 0; k < сapacityOptions.length; k++) {
        if (k !== 1 && k !== 2) {
          сapacityOptions[k].setAttribute('disabled', 'disabled');
        }
      }

    } else if (+adFormSelectRoomNumber.value === 3) {
      removeAttributeFormElements(сapacityOptions);

      for (var l = 0; l < сapacityOptions.length; l++) {
        if (l === 3) {
          сapacityOptions[l].setAttribute('disabled', 'disabled');
        }
      }

    } else if (+adFormSelectRoomNumber.value === 100) {
      removeAttributeFormElements(сapacityOptions);
      adFormSelectRoomCapacity.value = '0';

      for (var z = 0; z < сapacityOptions.length; z++) {
        if (z !== 3) {
          сapacityOptions[z].setAttribute('disabled', 'disabled');
        }
      }
    }
  };

  // Обработчик кнопки "Опубликовать"
  var onAdFormButtonSubmitClick = function () {
    validateAdFormInputTitle();
    validateAdFormInputPriceAndType();
    validateAdFormCapacity();
  };

  var resetForm = function () {
    adFormInputTitle.value = '';
    adFormSelectType.value = 'flat';
    adFormInputPrice.value = '';
    adFormInputPrice.placeholder = '5000';
    adFormSelectRoomNumber.value = '1';
    adFormSelectRoomCapacity.value = '1';
    adFormSelectDescription.value = '';
    adFormselectTimein.value = '12:00';
    adFormselectTimeout.value = '12:00';

    for (var i = 0; i < adFormAllFeatures.length; i++) {
      adFormAllFeatures[i].checked = false;
    }
  };

  adFormResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  // Функция для добавления обработчиков на форму
  var addListenersToAdForm = function () {
    adFormInputTitle.addEventListener('input', onAdFormInputTitle);
    adFormSelectType.addEventListener('change', onAdFormTypeChange);
    adFormInputPrice.addEventListener('input', onAdFormPriceInput);
    adFormSelectRoomNumber.addEventListener('change', onAdFormSelectRoomChange);
    adFormSelectRoomCapacity.addEventListener('change', onAdFormSelectCapacityChange);
    adFormSelectTime.addEventListener('change', onAdFormTimeChange);
    adFormButtonSubmit.addEventListener('click', onAdFormButtonSubmitClick);
    adFormSelectRoomNumber.addEventListener('change', onAdFormGuestChange);
  };

  // Функция для удаления обработчиков на форме
  var removeListenersToAdForm = function () {
    adFormInputTitle.removeEventListener('input', onAdFormInputTitle);
    adFormSelectType.removeEventListener('change', onAdFormTypeChange);
    adFormInputPrice.removeEventListener('input', onAdFormPriceInput);
    adFormSelectRoomNumber.removeEventListener('change', onAdFormSelectRoomChange);
    adFormSelectRoomCapacity.removeEventListener('change', onAdFormSelectCapacityChange);
    adFormSelectTime.removeEventListener('change', onAdFormTimeChange);
    adFormButtonSubmit.removeEventListener('click', onAdFormButtonSubmitClick);
    adFormSelectRoomNumber.removeEventListener('change', onAdFormGuestChange);
  };

  var onSuccess = function () {
    window.message.showSuccessMessage();
    window.page.deactivatePage();
  };

  var onError = function () {
    window.message.showErrorMessage();
  };

  function adFormSubmit(evt) {
    evt.preventDefault();

    window.backend.saveData(onSuccess, onError, new FormData(adForm));
  }

  window.form = {
    adFormSubmit: adFormSubmit,
    mainPin: mainPin,
    addAttributeFormElements: addAttributeFormElements,
    removeAttributeFormElements: removeAttributeFormElements,
    сhangeAdFormState: сhangeAdFormState,
    addListenersToAdForm: addListenersToAdForm,
    removeListenersToAdForm: removeListenersToAdForm,
    setAddressField: setAddressField,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
  };
})();

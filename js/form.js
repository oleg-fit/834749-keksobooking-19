'use strict';

// Задание module4-task2==========================================================================================================
var ENTER_KEY = 'Enter';

var mapPinMain = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormButtonSubmit = adForm.querySelector('.ad-form__submit');
var adFormSelectRoomNumber = adForm.querySelector('#room_number');
var adFormSelectRoomCapacity = adForm.querySelector('#capacity');
var adFormInputTitle = adForm.querySelector('#title');
var adFormInputPrice = adForm.querySelector('#price');
var adFormSelectType = adForm.querySelector('#type');

var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var adFormTextareas = adForm.querySelectorAll('textarea');
var adFormButtons = adForm.querySelectorAll('button');


var adFormSelectTime = adForm.querySelector('.ad-form__element--time');
var adFormselectTimein = adForm.querySelector('#timein');
var adFormselectTimeout = adForm.querySelector('#timeout');

var addAttributeAdFormElements = function (arr) {
  for (var j = 0; j < arr.length; j++) {
    arr[j].setAttribute('disabled', 'disabled');
  }
};

var removeAttributeAdFormElements = function (arr) {
  for (var j = 0; j < arr.length; j++) {
    arr[j].removeAttribute('disabled', 'disabled');
  }
};

var deactivatePage = function () {
  addAttributeAdFormElements(adFormInputs);
  addAttributeAdFormElements(adFormSelects);
  addAttributeAdFormElements(adFormTextareas);
  addAttributeAdFormElements(adFormButtons);
};

deactivatePage();

var activePage = function () {
  document.querySelector('.map').classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');
  removeAttributeAdFormElements(adFormInputs);
  removeAttributeAdFormElements(adFormSelects);
  removeAttributeAdFormElements(adFormTextareas);
  removeAttributeAdFormElements(adFormButtons);
};

mapPinMain.addEventListener('mousedown', activePage);

// ==========================================================Не работает проверка на нажатие левой кнопки мыши
// mapPinMain.addEventListener('mousedown', function (evt) {
//   if (evt.instanceOfMouseEvent.button === 0) {
//     activePage();
//   }
// });

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activePage();
  }
});

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
// ==========================================================================Не работает!!!!
var validateAdFormCapacity = function () {
  var rooms = parseInt(adFormSelectRoomNumber.value, 10);
  var capacity = parseInt(adFormSelectRoomCapacity.value, 10);
  // console.log('Количество комнат ' + rooms);
  // console.log('Количество мест ' + capacity);

  if (rooms === 1 && capacity !== 1) {
    adFormSelectRoomNumber.setCustomValidity('В 1-ой комнате может быть только 1 гость');
    // adFormSelectRoomCapacity.setCustomValidity('В 1-ой комнате может быть только 1 гость');
  } else if (rooms === 2 && (capacity < 1 || capacity > 2)) {
    adFormSelectRoomNumber.setCustomValidity('В 2-х комнатах может от 1 до 2-х гостей');
    // adFormSelectRoomCapacity.setCustomValidity('В 2-х комнатах может от 1 до 2-х гостей');
  } else if (rooms === 3 && (capacity < 1 || capacity > 3)) {
    adFormSelectRoomNumber.setCustomValidity('В 3-х комнатах может быть от 1 до 3-х гостей');
    // adFormSelectRoomCapacity.setCustomValidity('В 3-х комнатах может быть от 1 до 3-х гостей');
  } else if (rooms === 100 && capacity !== 0) {
    adFormSelectRoomNumber.setCustomValidity('В 100 комнатах не может быть гостей');
    // adFormSelectRoomCapacity.setCustomValidity('В 100 комнатах не может быть гостей');
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

// Обработчик кнопки "Опубликовать"
var onAdFormButtonSubmitClick = function () {
  validateAdFormInputTitle();
  validateAdFormInputPriceAndType();
  validateAdFormCapacity();
};

// Функция для добавления обработчиков на форму
var addListenersToAdForm = function () {
  adFormInputTitle.addEventListener('input', onAdFormInputTitle);
  adFormSelectType.addEventListener('change', onAdFormTypeChange);
  adFormInputPrice.addEventListener('input', onAdFormPriceInput);
  adFormSelectRoomNumber.addEventListener('change', onAdFormSelectRoomChange);
  adFormSelectRoomCapacity.addEventListener('change', onAdFormSelectCapacityChange);
  adFormSelectTime.addEventListener('change', onAdFormTimeChange);
  adFormButtonSubmit.addEventListener('click', onAdFormButtonSubmitClick);
};

addListenersToAdForm();

// Функция для удаления обработчиков на форме
// var removeListenersToAdForm = function () {
//   adFormInputTitle.removeEventListener('input', onAdFormInputTitle);
//   adFormSelectType.removeEventListener('change', onAdFormTypeChange);
//   adFormInputPrice.removeEventListener('input', onAdFormPriceInput);
//   adFormSelectRoomNumber.removeEventListener('change', onAdFormSelectRoomChange);
//   adFormSelectRoomCapacity.removeEventListener('change', onAdFormSelectCapacityChange);
//   adFormSelectTime.removeEventListener('change', onAdFormTimeChange);
//   adFormButtonSubmit.removeEventListener('click', onAdFormButtonSubmitClick);
// };
'use strict';

// Задание module3-task2
var map = document.querySelector('.map');
var MAX_ADVERTISEMENT_QUANTITY = 8;
var TITLE = 'Заголовок';
var MAX_PRICE = 1000000;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var DESCRIPTION = 'Описание';

var type = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkin = [
  '12:00',
  '13:00',
  '14:00'
];

var checkout = [
  '12:00',
  '13:00',
  '14:00'];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


// Функция для создания случайного числа от min до max
function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

// Функция для создания случайного числа
var randomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};


// Функция для выбора одного случайного элемента из массива
var choosingRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


// Функция для создания массива со случайным кол-вом элементов из предложенного массива
function choosingRandomArr(arr) {
  var arrQuantity = 1 + Math.floor(Math.random() * (arr.length - 1));
  var arrPart = [];
  var arrIndex = 0;
  var usedIndexes = {};
  while (arrPart.length < arrQuantity) {
    arrIndex = Math.floor(Math.random() * arr.length);
    if (usedIndexes[arrIndex] === undefined) {
      usedIndexes[arrIndex] = true;
      arrPart.push(arr[arrIndex]);
    }
  }
  return arrPart;
}


// Функция для создания массива из 8 сгенерированных JS объектов
var creatAdvertisement = function () {
  var advertisementList = [];

  for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
    advertisementList.push({
      'author': {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        title: TITLE,
        address: randomNumber(map.clientWidth) + ', ' + randomInteger(130, 630),
        price: randomInteger(0, MAX_PRICE),
        type: choosingRandomValue(type),
        rooms: randomInteger(1, MAX_ROOMS),
        guests: randomInteger(0, MAX_GUESTS),
        checkin: choosingRandomValue(checkin),
        checkout: choosingRandomValue(checkout),
        features: choosingRandomArr(features),
        description: DESCRIPTION,
        photos: choosingRandomArr(photos)
      },
      'locationPin': {
        x: randomNumber(map.clientWidth),
        y: randomInteger(130, 630)
      }
    });
  }
  return advertisementList;
};


// Функция для показа карты
var showMap = function () {
  map.classList.remove('map--faded');
};


// Создаем шаблон и вставляем его на страницу и показываем карту
var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var advertisementList = creatAdvertisement();

var renderPin = function (arr) {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinElement = templatePin.cloneNode(true);

  pinElement.style.left = (arr.locationPin.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (arr.locationPin.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
  fragment.appendChild(renderPin(advertisementList[i]));
}

mapPins.appendChild(fragment);
showMap();

// Задание module3-task3
var mapFiltersContainer = document.querySelector('.map__filters-container');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');


var renderCards = function (arr) {
  var cardElement = templateCard.cloneNode(true);
  var typeOfHousing = cardElement.querySelector('.popup__type');
  var roomsCapacity = cardElement.querySelector('.popup__text--capacity');
  var strRoomsFor = ' комнаты для ';
  var strGuests = ' гостей';

  cardElement.querySelector('.popup__title').textContent = arr[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr[0].offer.price + 'P/ночь';

  // Условия для типа жилья
  if (arr[0].offer.type === 'palace') {
    typeOfHousing.textContent = 'Дворец';
  } else if (arr[0].offer.type === 'flat') {
    typeOfHousing.textContent = 'Квартира';
  } else if (arr[0].offer.type === 'house') {
    typeOfHousing.textContent = 'Дом';
  } else {
    typeOfHousing.textContent = 'Бунгало';
  }

  // Количество гостей и комнат
  if (arr[0].offer.rooms === 1) {
    strRoomsFor = ' комната для ';
  } else if (arr[0].offer.rooms > 4) {
    strRoomsFor = ' комнат для ';
  }
  if (arr[0].offer.guests === 1) {
    strGuests = ' гостя';
  }
  roomsCapacity.textContent = arr[0].offer.rooms + strRoomsFor + arr[0].offer.guests + strGuests;

  // Время заезда и выезда
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout;

  // Все доступные удобства Не сделано!!!!!!

  // Описание объекта недвижимости
  cardElement.querySelector('.popup__description').textContent = arr[0].offer.description;

  // Все фотографии из списка Не сделано!!!!!

  // Аватар пользователя
  cardElement.querySelector('.popup__avatar').src = arr[0].author.avatar;

  // mapFiltersContainer.parentNode.insertBefore(cardElement, mapFiltersContainer);
  return cardElement;
};

mapFiltersContainer.parentNode.insertBefore(renderCards(advertisementList), mapFiltersContainer);
// renderCards();

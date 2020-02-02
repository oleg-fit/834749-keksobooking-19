'use strict';

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


var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var pinWidth = 50;
var minLocationXMap = 0;
var maxLocationXMap = mapWidth - pinWidth;


// Функция для создания одного JS объектов.
var creatAdvertisementItem = function () {
  var advertisementListItem = {};


  advertisementListItem['author'] = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  advertisementListItem['locationPin'] = {
    x: randomInteger(minLocationXMap, maxLocationXMap),
    y: randomInteger(130, 630)
  };

  var locationPinX = advertisementListItem.locationPin.x;
  var locationPinY = advertisementListItem.locationPin.y;

  advertisementListItem['offer'] = {
    title: TITLE,
    address: locationPinX + ', ' + locationPinY,
    price: randomInteger(0, MAX_PRICE),
    type: choosingRandomValue(type),
    rooms: randomInteger(1, MAX_ROOMS),
    guests: randomInteger(0, MAX_GUESTS),
    checkin: choosingRandomValue(checkin),
    checkout: choosingRandomValue(checkout),
    features: choosingRandomArr(features),
    description: DESCRIPTION,
    photos: choosingRandomArr(photos)
  };

  return advertisementListItem;
};


// Функция для создания массива из 8 сгенерированных JS объектов.
var creatAdvertisement = function () {
  var advertisementList = [];
  for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
    advertisementList.push(creatAdvertisementItem());
  }
  return advertisementList;
};


// ====================================================== Тест
// var creatAdvertisement = function () {
//   var advertisementList = [];

//   for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {

//     advertisementList.push(function () {
//       var advertisementListItem = {};


//       advertisementListItem['author'] = {
//         avatar: 'img/avatars/user0' + (i + 1) + '.png'
//       };

//       advertisementListItem['locationPin'] = {
//         x: randomInteger(minLocationXMap, maxLocationXMap),
//         y: randomInteger(130, 630)
//       };

//       var locationPinX = advertisementListItem.locationPin.x;
//       var locationPinY = advertisementListItem.locationPin.y;

//       advertisementListItem['offer'] = {
//         title: TITLE,
//         address: locationPinX + ', ' + locationPinY,
//         price: randomInteger(0, MAX_PRICE),
//         type: choosingRandomValue(type),
//         rooms: randomInteger(1, MAX_ROOMS),
//         guests: randomInteger(0, MAX_GUESTS),
//         checkin: choosingRandomValue(checkin),
//         checkout: choosingRandomValue(checkout),
//         features: choosingRandomArr(features),
//         description: DESCRIPTION,
//         photos: choosingRandomArr(photos)
//       };

//       return advertisementListItem;
//     });
//   }
//   return advertisementList;
// };
// console.log(creatAdvertisement());
// ====================================================== Тест

// Удаляем лишний класс у блока
map.classList.remove('map--faded');


// Создаем шаблон и вставляем его на страницу
var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var advertisementList = creatAdvertisement();

var renderPin = function (arr) {
  var pinElement = templatePin.cloneNode(true);

  pinElement.style.left = arr.locationPin.x + 'px';
  pinElement.style.top = arr.locationPin.y + 'px';
  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
  fragment.appendChild(renderPin(advertisementList[i]));
}

mapPins.appendChild(fragment);

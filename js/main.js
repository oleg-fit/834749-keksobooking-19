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
  var rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
}


// Функция для выбора одного случайного элемента из массива
var choosingRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


// Функция для создания массива со случайным кол-вом элементов из предложенного массива
function choosingRandomArr (arr) {
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


var author = {
  avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png' // сделано
};

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var minLocationXMap = map.offsetLeft;
var maxLocationXMap = map.offsetLeft + mapWidth;

// все исчезает с кодом нижу
// var location = {
//   x: randomInteger(minLocationXMap, maxLocationXMap),
//   y: randomInteger(130, 630)
// };


var offer = {
  title: TITLE, // сделано
  address: location.x + ', ' + location.y, // не сделано
  price: randomInteger(0, MAX_PRICE), // сделано
  type: choosingRandomValue(type), // сделано
  rooms: randomInteger(1, MAX_ROOMS), // сделано
  guests: randomInteger(0, MAX_GUESTS), // сделано
  checkin: choosingRandomValue(checkin), // сделано
  checkout: choosingRandomValue(checkout), // сделано
  features: choosingRandomArr(features), // сделано
  description: DESCRIPTION, // сделано
  photos: choosingRandomArr(photos) // сделано
};


// Функция для создания массива из 8 сгенерированных JS объектов.
// var creatAdvertisement = function () {
//   var advertisementList = [];
//   for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {

//   }
//   return advertisementList;
// };


// Удаляем лишний класс у блока
map.classList.remove('map--faded');


// Создаем шаблон и вставляем его на страницу
var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < 8; i++) {
  var pinElement = templatePin.cloneNode(true);

  // var pinElementWidth = pinElement.offsetWidth;
  // var pinElementHeight = pinElement.offsetHeight;
  // console.log(pinElementWidth);
  // console.log(pinElementHeight);


  pinElement.style.left = randomInteger(minLocationXMap, maxLocationXMap) + 'px';
  pinElement.style.top = randomInteger(130, 630) + 'px';
  pinElement.querySelector('img').src = 'img/avatars/user0' + randomInteger(1, 8) + '.png';
  pinElement.querySelector('img').alt = offer.title;

  mapPins.appendChild(pinElement);
}













// var renderPin = function() {
//   var pinElement = templatePin.cloneNode(true);

  // var pinElementWidth = pinElement.offsetWidth;
  // var pinElementHeight = pinElement.offsetHeight;
  // console.log(pinElementWidth);
  // console.log(pinElementHeight);


//   pinElement.style.left = randomInteger(minLocationXMap, maxLocationXMap) + 'px';
//   pinElement.style.top = randomInteger(130, 630) + 'px';
//   pinElement.querySelector('img').src = 'img/avatars/user0' + randomInteger(1, 7) + '.png';
//   pinElement.querySelector('img').alt = offer.title;

//   return pinElement;
// };

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < 8; i++) {
//   fragment.appendChild(renderPin(pinElement[i]));
// }

// similarListElement.appendChild(fragment);

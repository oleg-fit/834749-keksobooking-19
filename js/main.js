'use strict';

var TITLE = 'Заголовок';
var MAXPRICE = 6000;
var MAXROOMS = 5;
var MAXGUESTS = 10;
var DESCRIPTION = 'Описание';

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var minLocationXMap = map.offsetLeft;
var maxLocationXMap = map.offsetLeft + mapWidth;

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

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var choosingRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

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

var offer = {
  title: TITLE, // сделано
  // address: 'location.x, location.y', // не сделано
  price: randomInteger(0, MAXPRICE), // сделано
  type: choosingRandomValue(type), // сделано
  rooms: randomInteger(1, MAXROOMS), // сделано
  guests: randomInteger(0, MAXGUESTS), // сделано
  checkin: choosingRandomValue(checkin), // сделано
  checkout: choosingRandomValue(checkout), // сделано
  features: choosingRandomArr(features), // сделано
  description: DESCRIPTION, // сделано
  photos: choosingRandomArr(photos) // сделано
};

// все исчезает с кодом нижу
// var location = {
//   x: randomInteger(minLocationXMap, maxLocationXMap),
//   y: randomInteger(130, 630)
// };

map.classList.remove('map--faded');


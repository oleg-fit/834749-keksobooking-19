'use strict';

var title = ['Уютная', 'Комфортабельная', 'Крохотная', 'Пустая', 'Светлая'];
var price = [1000, 2000, 3000, 4000, 5000, 6000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var choosingRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var choosingRandomFeatures = function (arr2) {
  var i = 0;
  var k = 0;
  var arr = [];
  var maxArrLenght = 1 + Math.floor(Math.random() * (arr2.length - 1));

  while (i < maxArrLenght) {
    var randomElementFeatures = arr2[Math.floor(Math.random() * arr2.length)];

    while (k < arr.length) {
      if (arr[k] !== randomElementFeatures) {
        arr.push(randomElementFeatures);
      }
      k++;
    }
    i++;
  }

  return arr;
};

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// console.log(choosingRandomFeatures(features));

var author = {
  avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png'
};

var offer = {
  title: choosingRandomValue(title),
  address: '600, 350',
  price: choosingRandomValue(price),
  type: choosingRandomValue(type),
  rooms: choosingRandomValue(rooms),
  guests: choosingRandomValue(guests),
  checkin: choosingRandomValue(checkin),
  checkout: choosingRandomValue(checkout),
  features: choosingRandomFeatures(features)
};

// var location = {
//   x: 100,
//   y: randomInteger(130, 630)
// }



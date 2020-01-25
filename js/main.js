'use strict';

var price = [1000, 2000, 3000, 4000, 5000, 6000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];

var choosingRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var author = {
  avatar: 'img/avatars/user.png'
  // не сделано
  // адрес изображения вида img/avatars/user**{{xx}}**.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
};

var offer = {
  title: 'Уютная',
  address: '600, 350',
  price: choosingRandomValue(price),
  type: choosingRandomValue(type),
  rooms: choosingRandomValue(rooms),
  guests: choosingRandomValue(guests),
  checkin: choosingRandomValue(checkin),
  checkout: choosingRandomValue(checkout)
  // features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
  // description: строка с описанием,
  // photos: массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
};

var location = {
  x: 100,
  // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  y: 135
  // случайное число, координата y метки на карте от 130 до 630.
}

console.log(offer);

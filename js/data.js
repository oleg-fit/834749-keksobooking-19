'use strict';

(function () {
  // var MAX_PRICE = 1000000;
  // var MAX_ROOMS = 5;
  // var MAX_GUESTS = 10;

  // var title = ['Коттедж', 'Дворец', 'Дом', 'Квартира', 'Двушка', 'Трешка'];
  // var MAX_ADVERTISEMENT_QUANTITY = 8;
  // var description = ['Лучший выбор', 'Хороший выбор', 'Отличный выбор', 'Неожиданный выбор'];
  // var map = document.querySelector('.map');
  // var type = ['palace', 'flat', 'house', 'bungalo'];
  // var checkin = ['12:00', '13:00', '14:00'];
  // var checkout = ['12:00', '13:00', '14:00'];
  // var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var photos = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];

  // Функция для создания случайного числа от min до max
  // var randomInteger = function (min, max) {
  //   var rand = min + Math.random() * (max - min);
  //   return Math.round(rand);
  // };

  // Функция для создания случайного числа
  // var randomNumber = function (number) {
  //   return Math.floor(Math.random() * (number + 1));
  // };

  // Функция для выбора одного случайного элемента из массива
  // var choosingRandomValue = function (arr) {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // };

  // Функция для создания массива со случайным кол-вом элементов из предложенного массива
  // function choosingRandomArr(arr) {
  //   var arrQuantity = 1 + Math.floor(Math.random() * (arr.length - 1));
  //   var arrPart = [];
  //   var arrIndex = 0;
  //   var usedIndexes = {};
  //   while (arrPart.length < arrQuantity) {
  //     arrIndex = Math.floor(Math.random() * arr.length);
  //     if (usedIndexes[arrIndex] === undefined) {
  //       usedIndexes[arrIndex] = true;
  //       arrPart.push(arr[arrIndex]);
  //     }
  //   }
  //   return arrPart;
  // }

  // Функция для создания массива из 8 сгенерированных JS объектов
  // var creatAdvertisement = function () {
  //   var advertisementList = [];

  //   for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
  //     var xCoordinate = randomNumber(map.clientWidth);
  //     var yCoordinate = randomInteger(130, 630);

  //     advertisementList.push({
  //       'author': {
  //         avatar: 'img/avatars/user0' + (i + 1) + '.png'
  //       },
  //       'offer': {
  //         title: choosingRandomValue(title),
  //         address: xCoordinate + ', ' + yCoordinate,
  //         price: randomInteger(0, MAX_PRICE),
  //         type: choosingRandomValue(type),
  //         rooms: randomInteger(1, MAX_ROOMS),
  //         guests: randomInteger(0, MAX_GUESTS),
  //         checkin: choosingRandomValue(checkin),
  //         checkout: choosingRandomValue(checkout),
  //         features: choosingRandomArr(features),
  //         description: choosingRandomValue(description),
  //         photos: choosingRandomArr(photos)
  //       },
  //       'locationPin': {
  //         x: xCoordinate,
  //         y: yCoordinate
  //       }
  //     });
  //   }
  //   return advertisementList;
  // };

  // ============================================Данные с сервера

  var onSuccess = function (data) {
    window.data = {
      serverAdvertisment: data
    };
  };

  window.load.getData(onSuccess, false);

})();

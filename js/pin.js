'use strict';

(function () {
  var MAX_ADVERTISEMENT_QUANTITY = 8;

  var mapPins = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var advertisementList = window.data.creatAdvertisement;

  // Создаем метку
  var renderPin = function (arr, idIndex) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinElement = templatePin.cloneNode(true);

    pinElement.id = idIndex + 'pin';
    pinElement.style.left = (arr.locationPin.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (arr.locationPin.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;

    return pinElement;
  };

  // Наполнение метками
  var createMapElements = function () {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
      fragment.appendChild(renderPin(advertisementList[i], i));
    }

    mapPins.appendChild(fragment);
  };

  // ==================================От сервака
  // window.load(function (pin) {
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
  //     fragment.appendChild(renderPin(pin[i]));
  //   }

  //   mapPins.appendChild(fragment);
  // });
  // ==================================От сервака

  window.pin = {
    createMapElements: createMapElements,
    MAX_ADVERTISEMENT_QUANTITY: MAX_ADVERTISEMENT_QUANTITY
  };
})();

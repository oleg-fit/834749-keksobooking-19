'use strict';

(function () {
  var MAX_ADVERTISEMENT_QUANTITY = 5;

  var mapPins = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создаем метку
  var renderPin = function (arr, idIndex) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinElement = templatePin.cloneNode(true);

    pinElement.id = idIndex + 'pin';
    pinElement.style.left = (arr.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (arr.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;

    return pinElement;
  };

  // Наполнение метками
  var createMapElements = function () {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i <= MAX_ADVERTISEMENT_QUANTITY; i++) {
      fragment.appendChild(renderPin(window.data.serverAdvertisment[i], i));
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    createMapElements: createMapElements,
    MAX_ADVERTISEMENT_QUANTITY: MAX_ADVERTISEMENT_QUANTITY,
  };
})();

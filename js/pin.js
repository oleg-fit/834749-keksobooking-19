'use strict';

(function () {
  var MAX_ADVERTISEMENT_QUANTITY = 4;

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

    if (window.filter.dataSort && window.filter.dataSort.length > 0) {
      for (var i = 0; i <= (window.filter.dataSort.length < MAX_ADVERTISEMENT_QUANTITY ? (window.filter.dataSort.lenght) : MAX_ADVERTISEMENT_QUANTITY); i++) {
        fragment.appendChild(renderPin(window.filter.dataSort[i], i));
      }
    } else {
      for (var j = 0; j <= MAX_ADVERTISEMENT_QUANTITY; j++) {
        fragment.appendChild(renderPin(window.data.serverAdvertisment[j], j));
      }
    }

    mapPins.appendChild(fragment);
  };

  // Удаление пинов
  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }
  };

  window.pin = {
    removePins: removePins,
    createMapElements: createMapElements,
    MAX_ADVERTISEMENT_QUANTITY: MAX_ADVERTISEMENT_QUANTITY,
  };
})();

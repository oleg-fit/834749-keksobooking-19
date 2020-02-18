'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';

  var STATUS = {
    CODE_OK: 200
  };

  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS.CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте интернет соединение');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_DATA.load);
    xhr.send();
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderCards = function (popapCard) {
    var popupCardElement = similarCardTemplate.cloneNode(true);

    // Добаляем заголовок на карту объявления
    popupCardElement.querySelector('.popup__title').textContent = popapCard.offer.title;

    // Добаляем координаты метки на карту объявления
    popupCardElement.querySelector('.popup__text--address').textContent = popapCard.offer.address;

    // Добаляем цену за ночь на карту на карту объявления
    popupCardElement.querySelector('.popup__text--price').textContent = popapCard.offer.price + 'P/ночь';

    return popupCardElement;
  };

  var MAX_ADVERTISEMENT_QUANTITY = 8;

  var successHandler = function (popapCards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
      fragment.appendChild(renderCards(popapCards[i]));
    }

    // similarListElement.appendChild(fragment);

  };

  window.data = {
    successHandler: successHandler,
    load: load
  };


})();

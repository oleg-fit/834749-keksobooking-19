'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var renderCards = function (arr) {
    var cardElement = templateCard.cloneNode(true);
    var typeOfHousing = cardElement.querySelector('.popup__type');
    var roomsCapacity = cardElement.querySelector('.popup__text--capacity');
    var strRoomsFor = ' комнаты для ';
    var strGuests = ' гостей';

    cardElement.querySelector('.popup__title').textContent = arr[0].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arr[0].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arr[0].offer.price + 'P/ночь';

    // Условия для типа жилья
    if (arr[0].offer.type === 'palace') {
      typeOfHousing.textContent = 'Дворец';
    } else if (arr[0].offer.type === 'flat') {
      typeOfHousing.textContent = 'Квартира';
    } else if (arr[0].offer.type === 'house') {
      typeOfHousing.textContent = 'Дом';
    } else {
      typeOfHousing.textContent = 'Бунгало';
    }

    // Количество гостей и комнат
    if (arr[0].offer.rooms === 1) {
      strRoomsFor = ' комната для ';
    } else if (arr[0].offer.rooms > 4) {
      strRoomsFor = ' комнат для ';
    }
    if (arr[0].offer.guests === 1) {
      strGuests = ' гостя';
    }
    roomsCapacity.textContent = arr[0].offer.rooms + strRoomsFor + arr[0].offer.guests + strGuests;

    // Время заезда и выезда
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout;

    // Все доступные удобства Не сделано!!!!!!

    // Описание объекта недвижимости
    cardElement.querySelector('.popup__description').textContent = arr[0].offer.description;

    // Все фотографии из списка Не сделано!!!!!

    // Аватар пользователя
    cardElement.querySelector('.popup__avatar').src = arr[0].author.avatar;

    return cardElement;
  };

  mapFiltersContainer.parentNode.insertBefore(renderCards(window.data.creatAdvertisement), mapFiltersContainer);
})();

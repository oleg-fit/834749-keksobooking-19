'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  // Функция для создания элемента со списком характеристик для карты объявления
  var renderPopupCardFeatures = function (cardFeatures) {
    var featuresFragment = document.createDocumentFragment();

    for (var counterFeatures = 0; counterFeatures < cardFeatures.length; counterFeatures++) {
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + cardFeatures[counterFeatures]);
      featuresFragment.appendChild(element);
    }

    return featuresFragment;
  };

  // Функция для создания элемента со списком фотографий для карты объявления
  var renderPopupCardPhotos = function (offerPhotos) {
    var photosFragment = document.createDocumentFragment();

    for (var counterPhoto = 0; counterPhoto < offerPhotos.length; counterPhoto++) {
      var child = document.createElement('img');
      child.classList.add('popup__photo');
      child.src = offerPhotos[counterPhoto];
      child.alt = 'Фотография жилья';
      child.width = '45';
      child.height = '40';
      photosFragment.appendChild(child);
    }

    return photosFragment;
  };

  // Функция для очистки блока и наполнения его элементами
  var fillCardElements = function (popupParent, elements) {
    popupParent.innerHTML = '';
    popupParent.appendChild(elements);
  };


  var renderCards = function (arr) {
    var popupCardElement = templateCard.cloneNode(true);
    var popupCardTitle = popupCardElement.querySelector('.popup__title');
    var popupCardAddress = popupCardElement.querySelector('.popup__text--address');
    var popupCardPrice = popupCardElement.querySelector('.popup__text--price');
    var popupCardTypeOfHousing = popupCardElement.querySelector('.popup__type');
    var popapCardRoomsCapacity = popupCardElement.querySelector('.popup__text--capacity');
    var popapCardTime = popupCardElement.querySelector('.popup__text--time');
    var popupCardFeatures = popupCardElement.querySelector('.popup__features');
    var popupCardDescription = popupCardElement.querySelector('.popup__description');
    var popupCardPhotos = popupCardElement.querySelector('.popup__photos');

    var strRoomsFor = ' комнаты для ';
    var strGuests = ' гостей';

    // Добаляем аватар пользователя на карту объявления
    popupCardElement.querySelector('.popup__avatar').src = arr.author.avatar;

    // Добаляем заголовок на карту объявления
    popupCardTitle.textContent = arr.offer.title;

    // Добаляем координаты метки на карту объявления
    popupCardAddress.textContent = arr.offer.address;

    // Добаляем цену за ночь на карту на карту объявления
    popupCardPrice.textContent = arr.offer.price + 'P/ночь';

    // Добаляем тип жилья на карту объявления с помощью условия
    if (arr.offer.type === 'palace') {
      popupCardTypeOfHousing.textContent = 'Дворец';
    } else if (arr.offer.type === 'flat') {
      popupCardTypeOfHousing.textContent = 'Квартира';
    } else if (arr.offer.type === 'house') {
      popupCardTypeOfHousing.textContent = 'Дом';
    } else {
      popupCardTypeOfHousing.textContent = 'Бунгало';
    }

    // Условия изменения переменной со строкой
    if (arr.offer.rooms === 1) {
      strRoomsFor = ' комната для ';
    } else if (arr.offer.rooms > 4) {
      strRoomsFor = ' комнат для ';
    }
    if (arr.offer.guests === 1) {
      strGuests = ' гостя';
    }

    // Добаляем вместимость комнат для гостей на карту объявления
    popapCardRoomsCapacity.textContent = arr.offer.rooms + strRoomsFor + arr.offer.guests + strGuests;

    // Добаляем время заезда и выезда на карту объявления
    popapCardTime.textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

    // Добавляем характеристики на карту объявления
    fillCardElements(popupCardFeatures, renderPopupCardFeatures(arr.offer.features));

    // Добавляем описание объекта недвижимости на карту объявления
    popupCardDescription.textContent = arr.offer.description;

    // Добавляем фотографии жилья на карту объявления
    fillCardElements(popupCardPhotos, renderPopupCardPhotos(arr.offer.photos));

    return popupCardElement;
  };

  for (var k = 0; k < window.pin.MAX_ADVERTISEMENT_QUANTITY; k++) {
    mapFiltersContainer.parentNode.insertBefore(renderCards(window.data.creatAdvertisement[k]), mapFiltersContainer);
  }


})();

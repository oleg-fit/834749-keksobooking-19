'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');
  var mapFilterSelectType = mapFilter.querySelector('#housing-type');
  var mapFilterSelectPrice = mapFilter.querySelector('#housing-price');
  var mapFilterSelectRooms = mapFilter.querySelector('#housing-rooms');
  var mapFilterSelectGuests = mapFilter.querySelector('#housing-guests');
  var mapFilterFeaturesList = mapFilter.querySelector('#housing-features');

  var PriceTypeMap = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  var PriceValueMap = {
    MIN: 10000,
    MAX: 50000,
  };

  var activateFilterForm = function () {
    window.form.removeAttributeFormElements(mapFilterSelects);
    window.form.removeAttributeFormElements(mapFilterFieldset);
  };

  var deactivateFilterForm = function () {
    window.form.addAttributeFormElements(mapFilterSelects);
    window.form.addAttributeFormElements(mapFilterFieldset);
  };

  var сhangeFilterFormState = function (state) {
    if (state) {
      activateFilterForm();
    } else {
      deactivateFilterForm();
    }
  };

  var filterTheForm = function () {

    // Делаем копию данных
    var copyData = window.data.serverAdvertisment.slice();

    // Фильтр по типу жилья
    var filterHousingType = function (element) {
      return mapFilterSelectType.value === 'any' ? true : element.offer.type === mapFilterSelectType.value;
    };

    // Фильтр по цене
    var filterHousingPrice = function (element) {
      switch (mapFilterSelectPrice.value) {
        case PriceTypeMap.LOW:
          return element.offer.price < PriceValueMap.MIN;
        case PriceTypeMap.MIDDLE:
          return element.offer.price >= PriceValueMap.MIN && element.offer.price <= PriceValueMap.MAX;
        case PriceTypeMap.HIGH:
          return element.offer.price > PriceValueMap.MAX;
        default:
          return true;
      }
    };

    // Фильтр по кол-ву комнат
    var filterHousingRooms = function (element) {
      return mapFilterSelectRooms.value === 'any' ? true : parseInt(mapFilterSelectRooms.value, 10) === element.offer.rooms;
    };

    // Фильтр по кол-ву гостей
    var filterHousingGuests = function (element) {
      return mapFilterSelectGuests.value === 'any' ? true : parseInt(mapFilterSelectGuests.value, 10) === element.offer.guests;
    };

    // Фильтр по удобствам
    var filterHousingFeatures = function (element) {
      var filterResult = true;

      for (var i = 0; i < mapFilterFeaturesList.length; i++) {

        if (mapFilterFeaturesList[i].checked) {

          if (element.offer.features.indexOf(mapFilterFeaturesList[i].value) === -1) {

            filterResult = false;
            break;
          }
        }
      }
      return filterResult;
    };

    // Проверяем есть ли значение advertisment.filterScore
    var addFilterScoresToAdvertisment = function (advertisment) {

      if (advertisment.filterScore !== undefined) {
        advertisment.filterScore += 1;
      } else {
        advertisment.filterScore = 1;
      }
      return advertisment;
    };

    // Удаление значения advertisment.filterScore
    var resetFilterScores = function (advertisments) {
      for (var i = 0; i < advertisments.length; i += 1) {
        delete advertisments[i].filterScore;
      }
    };

    // Сравниваем параметр filterScore двух массивов и вовзращаем -1 либо 1
    var compareTwoAdvertisments = function (a, b) {
      return (a.filterScore > b.filterScore) ? -1 : 1;
    };

    var filterResults = copyData.map(function (advertisment) {
      if (filterHousingType(advertisment)) {
        return addFilterScoresToAdvertisment(advertisment);
      } else {
        return advertisment;
      }
    });

    filterResults = filterResults.map(function (advertisment) {
      if (filterHousingPrice(advertisment)) {
        return addFilterScoresToAdvertisment(advertisment);
      } else {
        return advertisment;
      }
    });

    filterResults = filterResults.map(function (advertisment) {
      if (filterHousingRooms(advertisment)) {
        return addFilterScoresToAdvertisment(advertisment);
      } else {
        return advertisment;
      }
    });

    filterResults = filterResults.map(function (advertisment) {
      if (filterHousingGuests(advertisment)) {
        return addFilterScoresToAdvertisment(advertisment);
      } else {
        return advertisment;
      }
    });

    filterResults = filterResults.map(function (advertisment) {
      if (filterHousingFeatures(advertisment)) {
        return addFilterScoresToAdvertisment(advertisment);
      } else {
        return advertisment;
      }
    });

    window.pin.removePins();

    var sortedByFileterScoresAdvertisments = filterResults.sort(compareTwoAdvertisments);

    window.filter.dataSort = sortedByFileterScoresAdvertisments;

    window.pin.createMapElements();

    resetFilterScores(window.data.serverAdvertisment);
  };

  window.filter = {
    сhangeFilterFormState: сhangeFilterFormState,
    filterTheForm: filterTheForm,
    mapFilter: mapFilter,
  };

})();

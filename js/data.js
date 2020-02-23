'use strict';

(function () {
  // Получаем данные с сервера

  var onSuccess = function (data) {
    window.data = {
      serverAdvertisment: data
    };
  };

  window.load.getData(onSuccess, false);

})();

'use strict';

(function () {
  // Получаем данные с сервера

  var onSuccess = function (data) {
    window.data = {
      serverAdvertisment: data
    };
  };

  window.backend.getData(onSuccess, false);

})();

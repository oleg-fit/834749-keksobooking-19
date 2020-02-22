'use strict';

(function () {
  var TIMEOUT = 10000;

  var STATUS = {
    OK: 200,
  };

  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var initXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Status:' + xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('XHR error');
    });

    xhr.addEventListener('timeout', function () {
      onError('XHR timeout' + xhr.timeout);
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var getData = function (onSuccess, onError) {
    var xhr = initXhr(onSuccess, onError);
    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  var saveData = function (onSuccess, onError, data) {
    var xhr = initXhr(onSuccess, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var objectsArray = [];

  var onSuccess = function (data) {
    objectsArray = data;
    return objectsArray;
  };

  window.request = {
    getData: getData,
    saveData: saveData,
    onSuccess: onSuccess
  };

})();

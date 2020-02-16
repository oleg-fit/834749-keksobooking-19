'use strict';

(function () {
  var COORDINATE_Y_MIN_PIN = 130;
  var COORDINATE_Y_MAX_PIN = 630;
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  var onClickActiveMainPin = function (evt) {
    var currentCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseUp = function () {
      window.form.setAddressField();
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    var onMouseMove = function (evtMove) {
      var shift = {
        x: currentCoords.x - evtMove.clientX,
        y: currentCoords.y - evtMove.clientY
      };

      currentCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var resultY = window.form.mainPin.offsetTop - shift.y;
      var resultX = window.form.mainPin.offsetLeft - shift.x;

      if (resultY < COORDINATE_Y_MIN_PIN - window.form.MAIN_PIN_HEIGHT) {
        resultY = COORDINATE_Y_MIN_PIN - window.form.MAIN_PIN_HEIGHT;
      } else if (resultY > COORDINATE_Y_MAX_PIN - window.form.MAIN_PIN_HEIGHT) {
        resultY = COORDINATE_Y_MAX_PIN - window.form.MAIN_PIN_HEIGHT;
      }

      if (resultX + window.form.MAIN_PIN_WIDTH / 2 < 0) {
        resultX = Math.round(-window.form.MAIN_PIN_WIDTH / 2);
      } else if (resultX + window.form.MAIN_PIN_WIDTH / 2 > mapWidth) {
        resultX = Math.round(mapWidth - window.form.MAIN_PIN_WIDTH / 2);
      }

      window.form.mainPin.style.top = resultY + 'px';
      window.form.mainPin.style.left = resultX + 'px';
      window.form.setAddressField();
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  window.movement = {
    onClickActiveMainPin: onClickActiveMainPin
  };

})();

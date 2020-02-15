'use strict';

(function () {
  var COORDINATE_X_MIN_PIN = 0;
  var COORDINATE_X_MAX_PIN = 1136;
  var COORDINATE_Y_MIN_PIN = 130;
  var COORDINATE_Y_MAX_PIN = 630;

  var onMainPinMouseDown = function (evt) {
    var mouseStart = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMouseMove = function (moveEvt) {
      var shift = {
        x: mouseStart.x - moveEvt.clientX,
        y: mouseStart.y - moveEvt.clientY
      };

      mouseStart.x = moveEvt.clientX;
      mouseStart.y = moveEvt.clientY;

      var pinCoord = {
        x: window.form.mainPin.offsetLeft - shift.x,
        y: window.form.mainPin.offsetTop - shift.y
      };

      if (!(pinCoord.x < COORDINATE_X_MIN_PIN - window.form.MAIN_PIN_WIDTH / 2 || pinCoord.x > COORDINATE_X_MAX_PIN + window.form.MAIN_PIN_WIDTH / 2)) {
        window.form.mainPin.style.left = pinCoord.x + 'px';
      }

      if (!(pinCoord.y < COORDINATE_Y_MIN_PIN - window.form.MAIN_PIN_HEIGHT || pinCoord.y > COORDINATE_Y_MAX_PIN - window.form.MAIN_PIN_HEIGHT)) {
        window.form.mainPin.style.top = pinCoord.y + 'px';
      }

      window.form.setAddressField();
    };

    var onMainPinMouseUp = function () {
      window.form.setAddressField();
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var addListenersToMainPinMove = function () {
    window.form.mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        onMainPinMouseDown(evt);
      }
    });
  };

  window.movement = {
    addListenersToMainPinMove: addListenersToMainPinMove
  };

})();

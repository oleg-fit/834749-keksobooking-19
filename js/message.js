'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  // Функция для показа сообщения, при не успешной отправки формы

  var showErrorMessage = function () {
    var errorBlockMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorBlockMessageTemplate.cloneNode(true);
    var closeButtonErrorMessage = errorMessageElement.querySelector('.error__button');
    var main = document.querySelector('main');

    main.appendChild(errorMessageElement);

    var onCloseButtonClick = function () {
      errorMessageElement.remove();
      closeButtonErrorMessage.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentKeydown = function (evt) {
      if (evt.key === ESC_KEY) {
        errorMessageElement.remove();
        closeButtonErrorMessage.removeEventListener('click', onCloseButtonClick);
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
      }
    };

    var onDocumentClick = function () {
      errorMessageElement.remove();
      closeButtonErrorMessage.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    closeButtonErrorMessage.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };


  // Функция для показа сообщения, при успешной отправки формы

  var showSuccessMessage = function () {

    var successBlockMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successBlockMessageTemplate.cloneNode(true);

    document.body.appendChild(successMessageElement);

    var onDocumentKeydown = function (evt) {
      if (evt.key === ESC_KEY) {
        successMessageElement.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
      }
    };

    var onDocumentClick = function () {
      successMessageElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage,

    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON
  };

})();

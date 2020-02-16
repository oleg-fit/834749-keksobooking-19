'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');

  // Функция активирует поля формы
  var activateFilterForm = function () {
    window.form.removeAttributeFormElements(mapFilterSelects);
    window.form.removeAttributeFormElements(mapFilterFieldset);
  };

  // Функция деактивирует поля формы
  var deactivateFilterForm = function () {
    window.form.addAttributeFormElements(mapFilterSelects);
    window.form.addAttributeFormElements(mapFilterFieldset);
  };

  // Фунция для изменения состояния формы
  var сhangeFilterFormState = function (state) {
    if (state) {
      activateFilterForm();
    } else {
      deactivateFilterForm();
    }
  };

  window.filter = {
    сhangeFilterFormState: сhangeFilterFormState
  };

})();

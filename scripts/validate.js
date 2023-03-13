// functions

function showError (form, field, message, errorMessageShownClass, fieldInvalidClass) {
  const errorSpan = form.querySelector(`.${field.id}-error`);
  errorSpan.classList.add(errorMessageShownClass);
  errorSpan.textContent = message;
  field.classList.add(fieldInvalidClass);
}

function hideError (form, field, errorMessageShownClass, fieldInvalidClass) {
  const errorSpan = field.closest('.popup__fields').querySelector(`.${field.id}-error`);
  errorSpan.classList.remove(errorMessageShownClass);
  field.classList.remove(fieldInvalidClass);
}

function changeErrorState (form, field, errorMessageShownClass, fieldInvalidClass) {
  if (field.validity.valid) {
    hideError(form, field, errorMessageShownClass, fieldInvalidClass);
  } else {
    showError(form, field, field.validationMessage, errorMessageShownClass, fieldInvalidClass);
  }
}

function checkValidity (fields) {
  return fields.every((field) => {
    return field.validity.valid;
  });
}

function changeButtonState (fields, button, buttonInactiveClass) {
  if (checkValidity(fields)) {
    button.classList.remove(buttonInactiveClass);
  } else {
    button.classList.add(buttonInactiveClass);
  }
}

function addDynamicListeners (form, options) {
  const fields = Array.from(form.querySelectorAll(options.fieldSelector));
  const button = form.querySelector(options.buttonSelector);

  changeButtonState(fields, button);

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      changeErrorState(form, field, options.errorMessageShownClass, options.fieldInvalidClass);
      changeButtonState(fields, button, options.buttonInactiveClass);
    });

    field.addEventListener('keypress', (evt) => {
      if(!checkValidity(fields) && evt.key === 'Enter') evt.preventDefault();
    });
  });
}

function addErrorClearListeners (options) { //добавляем слушатели в теле отдельной функции
  const buttonEdit = document.querySelector(options.buttonEditSelector);
  const buttonAdd = document.querySelector(options.buttonAddSelector);
  const formedit = document.querySelector(options.editFormSelector);
  const formEditFields = formedit.querySelectorAll(options.fieldSelector);
  const formAdd = document.querySelector(options.addFormSelector);
  const formAddFields = formAdd.querySelectorAll(options.fieldSelector);

  buttonEdit.addEventListener('click', () => {
    formEditFields.forEach((field) => {
      hideError(formedit, field, options.errorMessageShownClass, options.fieldInvalidClass)
    });
  });

  buttonAdd.addEventListener('click', () => {
    formAddFields.forEach((field) => {
      hideError(formAdd, field, options.errorMessageShownClass, options.fieldInvalidClass)
    });
  });
}

function enableValidation(options) {
  const forms = document.querySelectorAll(options.formSelector);

  forms.forEach((form) => {
    addDynamicListeners(form, options);
  });

  addErrorClearListeners(options);
}

//main code

enableValidation({
  errorMessageShownClass: 'popup__error-message_shown',
  fieldInvalidClass: 'popup__field_invalid',
  buttonInactiveClass: 'popup__submit-button_inactive',
  fieldSelector: '.popup__field',
  buttonSelector: '.popup__submit-button',
  formSelector: '.popup__fields',
  buttonEditSelector: '.profile__edit-button',
  buttonAddSelector: '.profile__add-button',
  editFormSelector: '[name=edit-profile]',
  addFormSelector: '[name=add-place]'
});

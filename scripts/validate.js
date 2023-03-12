// variables

const forms = document.querySelectorAll('.popup__fields');

// functions

function showError (field, message) {
  const errorSpan = field.closest('.popup__fields').querySelector(`.${field.id}-error`);
  errorSpan.classList.add('popup__error-message_shown');
  errorSpan.textContent = message;
  field.classList.add('popup__field_invalid');
}

function hideError (field) {
  const errorSpan = field.closest('.popup__fields').querySelector(`.${field.id}-error`);
  errorSpan.classList.remove('popup__error-message_shown');
  field.classList.remove('popup__field_invalid');
}

function changeErrorState (field) {
  if (field.validity.valid) {
    hideError(field);
    field.classList.remove('popup__field_invalid');
  } else {
    showError(field, field.validationMessage);
    field.classList.add('popup__field_invalid');
  }
}

function checkValidity (fields) {
  return fields.every((field) => {
    return field.validity.valid;
  });
}

function changeButtonState (fields, button) {
  if (checkValidity(fields)) {
    button.classList.remove('popup__submit-button_inactive');
  } else {
    button.classList.add('popup__submit-button_inactive');
  }
}

function addListeners (form) {
  const fields = Array.from(form.querySelectorAll('.popup__field'));
  const button = form.querySelector('.popup__submit-button');

  changeButtonState(fields, button);

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      changeErrorState(field);
      changeButtonState(fields, button);
    });
  });
}

//main code

forms.forEach((form) => {
  addListeners(form);
});

// class

export class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _showError(form, field, message, errorMessageShownClass, fieldInvalidClass) {
    const errorSpan = form.querySelector(`.${field.id}-error`);
    errorSpan.classList.add(errorMessageShownClass);
    errorSpan.textContent = message;
    field.classList.add(fieldInvalidClass);
  }

  _hideError(form, field, errorMessageShownClass, fieldInvalidClass) {
    const errorSpan = field.closest('.popup__fields').querySelector(`.${field.id}-error`);
    errorSpan.classList.remove(errorMessageShownClass);
    field.classList.remove(fieldInvalidClass);
  }

  _changeErrorState(form, field, errorMessageShownClass, fieldInvalidClass) {
    if (field.validity.valid) {
      this._hideError(form, field, errorMessageShownClass, fieldInvalidClass);
    } else {
      this._showError(form, field, field.validationMessage, errorMessageShownClass, fieldInvalidClass);
    }
  }

  _checkValidity(fields) {
    return fields.every((field) => {
      return field.validity.valid;
    });
  }

  _changeButtonState(fields, button, buttonInactiveClass) {
    if (this._checkValidity(fields)) {
      button.classList.remove(buttonInactiveClass);
    } else {
      button.classList.add(buttonInactiveClass);
    }
  }

  enableValidation() {
    const fields = Array.from(this._form.querySelectorAll(this._options.fieldSelector));
    const button = this._form.querySelector(this._options.buttonSelector);

    this._changeButtonState(fields, button, this._options.buttonInactiveClass);

    fields.forEach((field) => {
      field.addEventListener('input', () => {
        this._changeErrorState(this._form, field, this._options.errorMessageShownClass, this._options.fieldInvalidClass);
        this._changeButtonState(fields, button, this._options.buttonInactiveClass);
      });

      field.addEventListener('keypress', (evt) => {
        if (!this._checkValidity(fields) && evt.key === 'Enter') evt.preventDefault();
      });
    });
  }
}
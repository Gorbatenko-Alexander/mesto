// class

export default class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
    this._fields = Array.from(this._form.querySelectorAll(this._options.fieldSelector));
    this._button = this._form.querySelector(this._options.buttonSelector);
  }

  _showError(field) {
    const errorSpan = this._form.querySelector(`.${field.id}-error`);
    errorSpan.classList.add(this._options.errorMessageShownClass);
    errorSpan.textContent = field.validationMessage;
    field.classList.add(this._options.fieldInvalidClass);
  }

  _hideError(field) {
    const errorSpan = this._form.querySelector(`.${field.id}-error`);
    errorSpan.classList.remove(this._options.errorMessageShownClass);
    field.classList.remove(this._options.fieldInvalidClass);
  }

  _changeErrorState(field) {
    if (field.validity.valid) {
      this._hideError(field);
    } else {
      this._showError(field);
    }
  }

  _checkValidity() {
    return this._fields.every((field) => {
      return field.validity.valid;
    });
  }

  _changeButtonState() {
    if (this._checkValidity()) {
      this._button.classList.remove(this._options.buttonInactiveClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._options.buttonInactiveClass);
      this._button.disabled = true;
    }
  }

  resetErrors () {
    this._fields.forEach((field) => {
      this._hideError(field);
    })

    this._changeButtonState();
  }

  enableValidation() {
    this._changeButtonState();

    this._fields.forEach((field) => {
      field.addEventListener('input', () => {
        this._changeErrorState(field);
        this._changeButtonState();
      });
    });
  }
}

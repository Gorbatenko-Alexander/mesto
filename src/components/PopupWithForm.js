import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this.form = this._popup.querySelector('.popup__fields');
    this._fields = this.form.querySelectorAll('.popup__field');
    this._submitButton = this.form.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const result = {};
    this._fields.forEach((field) => result[field.name] = field.value);
    return result;
  }

  _submit(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues(), this._submitButton);
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submit.bind(this));
  }

  changeInputValues (inputValues) {
    this._fields.forEach((field) => field.value = inputValues[field.name]);
  }

  close() {
    super.close();
    this.form.reset();
  }
}

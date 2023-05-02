import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this.form = this._popup.querySelector('.popup__fields');
    this._submitButton = this.form.querySelector('.popup__submit-button');
  }

  open(cardElement, cardId) {
    this._card = cardElement;
    this._cardId = cardId;
    super.open();
  }

  _submit(evt) {
    evt.preventDefault();
    this._submitCallback(this._card, this._cardId, this._submitButton);
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submit.bind(this));
  }
}

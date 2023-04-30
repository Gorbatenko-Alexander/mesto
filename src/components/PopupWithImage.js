import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._popup.querySelector(".popup__picture");
    this._popupText = this._popup.querySelector(".popup__label");
  }

  open(pic, text) {
    this._popupPic.src = pic;
    this._popupPic.alt = text;
    this._popupText.textContent = text;
    super.open();
  }
}

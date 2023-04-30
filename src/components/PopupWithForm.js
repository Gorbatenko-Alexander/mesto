import Popup from "./Popup";
import {closePopup} from "../utils/utils";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this.form = this._popup.querySelector('.popup__fields');
    this._fields = this.form.querySelectorAll('.popup__field');
  }

  _getInputValues() {
    const result = {};
    this._fields.forEach((field) => result[field.name] = field.value);
    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submit.bind(this));
  }

  changeInputValues (userInfo) {
    this._fields.forEach((field) => field.value = userInfo[field.name]);
  }

  close() {
    super.close();
    this.form.reset();
  }
}

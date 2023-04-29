// imports

import {openPopup} from './GlobalFunctions.js';

// variables

const photoZoomPopup = document.querySelector("#pic-zoom");
const photoZoomPopupPic = photoZoomPopup.querySelector(".popup__picture");
const photoZoomPopupLabel = photoZoomPopup.querySelector(".popup__label");

// class

export class Card {
  constructor (placeInfo, selector) {
    this._placeInfo = placeInfo;

    this._placeTemplate = document.querySelector(selector).content.querySelector('.places__place-card');
    this._place = this._placeTemplate.cloneNode(true);
    this._placePic = this._place.querySelector(".places__place-pic");
    this._placeTitle = this._place.querySelector(".places__place-title");
    this._placeLikeButton = this._place.querySelector(".places__place-like");
    this._placeRemoveButton = this._place.querySelector(".places__place-remove");
  }

  _addContent () {
    this._placePic.alt = this._placeInfo.name;
    this._placePic.src = this._placeInfo.link;
    this._placeTitle.textContent = this._placeInfo.name;
  }

  _addLikeListener () {
    this._placeLikeButton.addEventListener('click', function (event) {
      const target = event.target;
      target.classList.toggle('places__place-like_active');
    });
  }

  _addRemoveListener () {
    this._placeRemoveButton.addEventListener('click', function (event) {
      const target = event.target;
      target.closest(".places__place-card").remove();
    });
  }

  _addZoomListener () {
    this._placePic.addEventListener('click', () => {
      photoZoomPopupPic.src = this._placeInfo.link;
      photoZoomPopupPic.alt = this._placeInfo.name;
      photoZoomPopupLabel.textContent = this._placeInfo.name;
      openPopup(photoZoomPopup);
    });
  }

  _setEventListeners() {
    this._addLikeListener ();
    this._addRemoveListener ();
    this._addZoomListener ();
  }

  returnCard () {
    this._addContent ();
    this._setEventListeners();

    return this._place;
  }
}

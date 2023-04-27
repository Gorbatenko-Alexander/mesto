// imports

import {openPopup} from './GlobalFunctions.js';

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

    this._photoZoomPopup = document.querySelector("#pic-zoom");
    this._photoZoomPopupPic = this._photoZoomPopup.querySelector(".popup__picture");
    this._photoZoomPopupLabel = this._photoZoomPopup.querySelector(".popup__label");
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

  _addZoomListener (page) {
    this._placePic.addEventListener('click', () => {
      this._photoZoomPopupPic.src = this._placeInfo.link;
      this._photoZoomPopupPic.alt = this._placeInfo.name;
      this._photoZoomPopupLabel.textContent = this._placeInfo.name;
      openPopup(this._photoZoomPopup, page);
    });
  }

  returnCard (page) {
    this._addContent ();
    this._addLikeListener ();
    this._addRemoveListener ();
    this._addZoomListener (page);

    return this._place;
  }
}

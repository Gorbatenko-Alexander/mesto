export default class Card {
  constructor (placeInfo, selector, handleCardClick) {
    this._placeInfo = placeInfo;
    this._handleCardClick = handleCardClick;

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
      this._handleCardClick(this._placeInfo.link, this._placeInfo.name);
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

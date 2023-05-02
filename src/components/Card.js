export default class Card {
  constructor (cardData) {
    this._placeInfo = cardData.placeInfo;
    this._handleCardClick = cardData.handleCardClick;
    this._userId = cardData.userId;
    this._deleteCallback = cardData.deleteCallback;
    this._changeLikeCallback = cardData.changeLikeCallback;

    this._placeTemplate = document.querySelector(cardData.selector).content.querySelector('.places__place-card');
    this._place = this._placeTemplate.cloneNode(true);
    this._placePic = this._place.querySelector(".places__place-pic");
    this._placeTitle = this._place.querySelector(".places__place-title");
    this._placeLikeButton = this._place.querySelector(".places__place-like");
    this._placeRemoveButton = this._place.querySelector(".places__place-remove");
    this._placeLikes = this._place.querySelector(".places__place-like-number");
  }

  _addContent () {
    this._placePic.alt = this._placeInfo.name;
    this._placePic.src = this._placeInfo.link;
    this._placeTitle.textContent = this._placeInfo.name;
    this._placeLikes.textContent = this._placeInfo.likes.length;
    if (this._userId === this._placeInfo.owner._id) {
      this._placeRemoveButton.classList.remove('places__place-remove_disabled');
    };
    if (this._placeInfo.likes.some((like) => {return like._id === this._userId})) {
      this._placeLikeButton.classList.add('places__place-like_active');
    };
  }

  _addLikeListener () {
    this._placeLikeButton.addEventListener('click', (evt) => {
      this._changeLikeCallback(this._placeLikes, this._placeLikeButton, this._placeInfo);
    });
  }

  _addRemoveListener () {
    this._placeRemoveButton.addEventListener('click', (evt) => {
      this._deleteCallback(evt.target.closest(".places__place-card"), this._placeInfo._id);
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

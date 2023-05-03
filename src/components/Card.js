export default class Card {
  constructor (cardData) {
    this._placeInfo = cardData.placeInfo;
    this._handleCardClick = cardData.handleCardClick;
    this._userId = cardData.userId;
    this._deleteCallback = cardData.deleteCallback;
    this._addLikeCallback = cardData.addLikeCallback;
    this._removeLikeCallback = cardData.removeLikeCallback;

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
    this._isLiked = this._placeInfo.likes.some((like) => {return like._id === this._userId});
    if (this._isLiked) {
      this._placeLikeButton.classList.add('places__place-like_active');
    };
  }

  _changeLikeListener () {
    this._placeLikeButton.addEventListener('click', () => { // Теперь все изменения лайков выполняются внутри Cards
      if (this._isLiked) {
        this._removeLikeCallback(this._placeInfo._id)
          .then((res) => {  // Все данные о лайках теперь определяются по ответу сервера внутри then, в том числе сердечко
            this._isLiked = res.likes.some((like) => {return like._id === this._userId}); // Поскольку кто-то может лайкнуть с другого места - факт наличия лайка определяется по ответу сервера
            this._placeLikes.textContent = res.likes.length;
            this._placeLikeButton.classList.remove('places__place-like_active');
          })
          .catch((error) => {console.log(error)}); // catch на случай ошибки;
      } else {
        this._addLikeCallback(this._placeInfo._id)
          .then((res) => {  // Все данные о лайках теперь определяются по ответу сервера внутри then, в том числе сердечко
            this._isLiked = res.likes.some((like) => {return like._id === this._userId}); // Поскольку кто-то может лайкнуть с другого места - факт наличия лайка определяется по ответу сервера
            this._placeLikes.textContent = res.likes.length;
            this._placeLikeButton.classList.add('places__place-like_active');
          })
          .catch((error) => {console.log(error)}); // catch на случай ошибки;
      }
    })
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
    this._changeLikeListener ();
    this._addRemoveListener ();
    this._addZoomListener ();
  }

  returnCard () {
    this._addContent ();
    this._setEventListeners();

    return this._place;
  }
}

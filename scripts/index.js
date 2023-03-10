// variables

const profileEditPopup = document.querySelector("#edit_profile");
const placeAddPopup = document.querySelector("#add_place");
const photoZoomPopup = document.querySelector("#pic_zoom");

const fieldProfileName = profileEditPopup.querySelector(".popup__field[name='profile_name']");
const fieldProfileAbout = profileEditPopup.querySelector(".popup__field[name='profile_about']");
const fieldPlaceName = placeAddPopup.querySelector(".popup__field[name='place_name']");
const fieldPlacePicLink = placeAddPopup.querySelector(".popup__field[name='place_pic_link']");

const profileEditForm = profileEditPopup.querySelector(".popup__fields");
const placeAddForm = placeAddPopup.querySelector(".popup__fields");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const photoZoomPopupPic = photoZoomPopup.querySelector(".popup__picture");
const photoZoomPopupLabel = photoZoomPopup.querySelector(".popup__label");

const buttonsExit = document.querySelectorAll(".popup__exit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const places = document.querySelector(".places");
const placeTemplate = document.querySelector("#place").content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// functions

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function generatePlace(placeInfo) {
  const place = placeTemplate.cloneNode(true);
  const placePic = place.querySelector(".places__place-pic");
  const placeTitle = place.querySelector(".places__place-title");
  const placeLikeButton = place.querySelector(".places__place-like");
  const placeRemoveButton = place.querySelector(".places__place-remove");

  placePic.alt = placeInfo.name;
  placePic.src = placeInfo.link;
  placeTitle.textContent = placeInfo.name;

  placeLikeButton.addEventListener('click', function (event) {
    const target = event.target;
    target.classList.toggle('places__place-like_active');
  });

  placeRemoveButton.addEventListener('click', function (event) {
    const target = event.target;
    target.closest(".places__place-card").remove();
  });

  placePic.addEventListener('click', function (event) {
    const target = event.target;
    photoZoomPopupPic.src = target.src;
    photoZoomPopupPic.alt = target.alt;
    photoZoomPopupLabel.textContent = target.alt;
    openPopup(photoZoomPopup);
  });

  return place;
}

// main code

initialCards.forEach(function(element){
  places.prepend(generatePlace(element));
});

buttonEdit.addEventListener('click', function() {
  openPopup(profileEditPopup);
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
});

buttonAdd.addEventListener('click', function () {
  openPopup(placeAddPopup);
});

buttonsExit.forEach (function(exit) {
  exit.addEventListener('click', function (evt) {
    const target = evt.target;
    const popup = target.closest(".popup");
    const form = popup.querySelector(".popup__fields");

    closePopup(popup);

    if (form) {       // "Не все попапы имеют формы" Именно поэтому я добавил проверку на наличие формы, не совсем понимаю что здесь нужно исправить
      form.reset();
    }
  });
});

profileEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
  closePopup(profileEditPopup);
  profileEditForm.reset();
});

placeAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placeInfo = {name: fieldPlaceName.value, link: fieldPlacePicLink.value};
  places.prepend(generatePlace(placeInfo));
  closePopup(placeAddPopup);
  placeAddForm.reset();
});

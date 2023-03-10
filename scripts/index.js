// variables

let editProfilePopup = document.querySelector("#edit_profile");
let addPlacePopup = document.querySelector("#add_place");
let zoomPopup = document.querySelector("#pic_zoom");

let fieldProfileName = editProfilePopup.querySelector(".popup__field[name='profile_name']");
let fieldProfileAbout = editProfilePopup.querySelector(".popup__field[name='profile_about']");
let fieldPlaceName = addPlacePopup.querySelector(".popup__field[name='place_name']");
let fieldPlacePicLink = addPlacePopup.querySelector(".popup__field[name='place_pic_link']");

let editProfileForm = editProfilePopup.querySelector(".popup__fields");
let addPlaceForm = addPlacePopup.querySelector(".popup__fields");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let zoomPopupPic = zoomPopup.querySelector(".popup__picture");
let zoomPopupLabel = zoomPopup.querySelector(".popup__label");

let exitButtons = document.querySelectorAll(".popup__exit");
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

let places = document.querySelector(".places");
let placeTemplate = document.querySelector("#place").content;
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

function addPlace(placeInfo) {
  let place = placeTemplate.cloneNode(true);
  place.querySelector(".places__place-pic").alt = placeInfo.name;
  place.querySelector(".places__place-pic").src = placeInfo.link;
  place.querySelector(".places__place-title").textContent = placeInfo.name;

  place.querySelector(".places__place-like").addEventListener('click', function (event) {
    let target = event.target;
    target.classList.toggle('places__place-like_active');
  });

  place.querySelector(".places__place-remove").addEventListener('click', function (event) {
    let target = event.target;
    target.parentElement.remove();
  });

  place.querySelector(".places__place-pic").addEventListener('click', function (event) {
    let target = event.target;
    zoomPopupPic.src = target.src;
    zoomPopupPic.alt = target.alt;
    zoomPopupLabel.textContent = target.alt;
    openPopup(zoomPopup, true);
  });

  places.prepend(place);
}

function openPopup (objectName, act) {
  if (act === true) {
    objectName.classList.add(objectName.classList[0]+'_opened');
  } else {
    objectName.classList.remove(objectName.classList[0]+'_opened');
  }
}

// main code

initialCards.forEach(addPlace);

editButton.addEventListener('click', function() {
  openPopup(editProfilePopup, true);
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(addPlacePopup, true);
});

exitButtons.forEach (function(exit) {
  exit.addEventListener('click', function (evt) {
    let target = evt.target;
    openPopup(target.parentElement.parentElement, false);

    if (target.parentElement.querySelector(".popup__fields")) {
      target.parentElement.querySelector(".popup__fields").reset();
    }
  });
});

editProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
  openPopup(editProfilePopup, false);
  editProfileForm.reset();
});

addPlaceForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let placeInfo = {name: fieldPlaceName.value, link: fieldPlacePicLink.value};
  addPlace(placeInfo);
  openPopup(addPlacePopup, false);
  addPlaceForm.reset();
});

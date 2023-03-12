// variables

const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector("#edit-profile");
const placeAddPopup = document.querySelector("#add-place");
const photoZoomPopup = document.querySelector("#pic-zoom");
const page = document.querySelector('.page');

const fieldProfileName = profileEditPopup.querySelector("#profile-name");
const fieldProfileAbout = profileEditPopup.querySelector("#profile-about");
const fieldPlaceName = placeAddPopup.querySelector("#place-name");
const fieldPlacePicLink = placeAddPopup.querySelector("#place-pic-link");

const profileEditForm = profileEditPopup.querySelector(".popup__fields");
const placeAddForm = placeAddPopup.querySelector(".popup__fields");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const photoZoomPopupPic = photoZoomPopup.querySelector(".popup__picture");
const photoZoomPopupLabel = photoZoomPopup.querySelector(".popup__label");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const places = document.querySelector(".places");
const placeTemplate = document.querySelector("#place").content.querySelector('.places__place-card');

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

function closeByEsc (evt) {
  const popupOpened = page.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
    if (popupOpened.querySelector('.popup__fields')) popupOpened.querySelector('.popup__fields').reset(); // Проверка наличия формы и её сброс
  }
}

function resetErrors (popup) {
  const errors = popup.querySelectorAll('.popup__error-message_shown');
  const errorFields = popup.querySelectorAll('.popup__field_invalid');
  errors.forEach((error) => {
    error.classList.remove('popup__error-message_shown')
  });
  errorFields.forEach((field) => {
    field.classList.remove('popup__field_invalid');
  });
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', closeByEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByEsc);
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

  placePic.addEventListener('click', function () {
    photoZoomPopupPic.src = placeInfo.link;
    photoZoomPopupPic.alt = placeInfo.name;
    photoZoomPopupLabel.textContent = placeInfo.name;
    openPopup(photoZoomPopup);
  });

  return place;
}

function placePopupExitListeners(popups) {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      const target = evt.target;
      const popup = evt.currentTarget;

      if (target.classList.contains('popup__exit') || target === popup) {
        closePopup(popup);
        if (popup.querySelector('.popup__fields')) popup.querySelector('.popup__fields').reset(); // Проверка наличия формы и её сброс
      }
    });
  });
}

function disableSubmitButton (popup) {
  const button = popup.querySelector('.popup__submit-button');
  button.classList.add('popup__submit-button_inactive');
}

function enableSubmitButton (popup) {
  const button = popup.querySelector('.popup__submit-button');
  button.classList.remove('popup__submit-button_inactive');
}

// main code

initialCards.forEach(function(element){
  places.prepend(generatePlace(element));
});

placePopupExitListeners(popups);

buttonEdit.addEventListener('click', function() {
  openPopup(profileEditPopup);
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
  enableSubmitButton(profileEditPopup);
  resetErrors(profileEditPopup);
});

buttonAdd.addEventListener('click', function () {
  openPopup(placeAddPopup);
  disableSubmitButton(placeAddPopup);
  resetErrors(placeAddPopup);
});

profileEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
  closePopup(profileEditPopup);
  console.log(profileName.textContent + profileAbout.textContent);
});

placeAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placeInfo = {name: fieldPlaceName.value, link: fieldPlacePicLink.value};
  places.prepend(generatePlace(placeInfo));
  closePopup(placeAddPopup);
});

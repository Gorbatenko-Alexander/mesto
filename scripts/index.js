// imports

import {initialCards, validationOptions} from './Data.js';
import {openPopup, closePopup, placePopupExitListeners, resetErrors} from './GlobalFunctions.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// variables

const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector("#edit-profile");
const placeAddPopup = document.querySelector("#add-place");

const fieldProfileName = profileEditPopup.querySelector("#profile-name");
const fieldProfileAbout = profileEditPopup.querySelector("#profile-about");
const fieldPlaceName = placeAddPopup.querySelector("#place-name");
const fieldPlacePicLink = placeAddPopup.querySelector("#place-pic-link");

const profileEditForm = profileEditPopup.querySelector(".popup__fields");
const placeAddForm = placeAddPopup.querySelector(".popup__fields");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const places = document.querySelector(".places");


// functions

function createCard(cardInfo) {
  const card = new Card(cardInfo, '#place');
  return card.returnCard();
}

// main code

initialCards.forEach(function(element){
  places.prepend(createCard(element));
});

const validatorEdit = new FormValidator(validationOptions, profileEditForm);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(validationOptions, placeAddForm);
validatorAdd.enableValidation();

placePopupExitListeners(popups);

buttonEdit.addEventListener('click', function() {
  openPopup(profileEditPopup);
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
  resetErrors(profileEditPopup);
});

buttonAdd.addEventListener('click', function () {
  placeAddForm.reset();
  openPopup(placeAddPopup);
  resetErrors(placeAddPopup);
});

profileEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
  closePopup(profileEditPopup);
});

placeAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placeInfo = {name: fieldPlaceName.value, link: fieldPlacePicLink.value};
  places.prepend(createCard(placeInfo));
  closePopup(placeAddPopup);
});

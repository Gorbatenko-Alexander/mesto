// imports

import {initialCards, validationOptions} from './Data.js';
import {openPopup, closePopup, placePopupExitListeners} from './GlobalFunctions.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// variables

const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector("#edit-profile");
const placeAddPopup = document.querySelector("#add-place");
const page = document.querySelector('.page');
const forms = document.querySelectorAll(".popup__fields");

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

const inputEvt = new Event('input');

// main code

initialCards.forEach(function(element){
  const card = new Card(element, '#place');
  places.prepend(card.returnCard(page));
});

forms.forEach((form) => {
  const validator = new FormValidator(validationOptions, form);
  validator.enableValidation();
});

placePopupExitListeners(popups, page);

buttonEdit.addEventListener('click', function() {
  openPopup(profileEditPopup, page);
  fieldProfileName.value = profileName.textContent;  //поскольку поля перезаписываются в любом случае - сброс формы не требуется
  fieldProfileAbout.value = profileAbout.textContent;
  fieldProfileName.dispatchEvent(inputEvt); //инициируем input для начальной валидации при открытии
  fieldProfileAbout.dispatchEvent(inputEvt);
});

buttonAdd.addEventListener('click', function () {
  placeAddForm.reset(); //сброс формы на открытии
  openPopup(placeAddPopup, page);
  fieldPlaceName.dispatchEvent(inputEvt); //инициируем input для начальной валидации при открытии
  fieldPlacePicLink.dispatchEvent(inputEvt);
});

profileEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
  closePopup(profileEditPopup, page);
});

placeAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placeInfo = {name: fieldPlaceName.value, link: fieldPlacePicLink.value};
  const card = new Card(placeInfo, '#place');
  places.prepend(card.returnCard(page));
  closePopup(placeAddPopup, page);
});

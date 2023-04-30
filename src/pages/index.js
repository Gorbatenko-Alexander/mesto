// imports
import './index.css';

import {buttonEdit, buttonAdd, initialCards, validationOptions} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

// Functions

function createCard(placeInfo) {
  const card = new Card(placeInfo, '#place', photoZoomPopup.open.bind(photoZoomPopup));
  return card.returnCard();
}

// Objects

const cards = new Section ({
    items: initialCards,
    renderer: (cardInfo) => {
      cards.addItem(createCard(cardInfo));
    } },
  '.places'
);

const user = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

const photoZoomPopup = new PopupWithImage('#pic-zoom');

const profileEditPopup = new PopupWithForm('#edit-profile', (inputValues) => {
  user.setUserInfo(inputValues);
});

const placeAddPopup = new PopupWithForm('#add-place', (inputValues) => {
  cards.addItem(createCard(inputValues));
});

const validatorEdit = new FormValidator(validationOptions, profileEditPopup.form);
const validatorAdd = new FormValidator(validationOptions, placeAddPopup.form);

// Code

cards.renderItems();

photoZoomPopup.setEventListeners();
profileEditPopup.setEventListeners();
placeAddPopup.setEventListeners();

validatorEdit.enableValidation();
validatorAdd.enableValidation();

buttonEdit.addEventListener('click', () => {
  profileEditPopup.changeInputValues(user.getUserInfo());
  profileEditPopup.open();
  validatorEdit.resetErrors(); // сделал через метод класса
});

buttonAdd.addEventListener('click', () => {
  placeAddPopup.open();
  validatorAdd.resetErrors();
});

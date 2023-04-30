// imports
import './index.css';

import {buttonEdit, buttonAdd, initialCards, validationOptions} from '../utils/constants.js';
import {openPopup, closePopup, placePopupExitListeners} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

// Objects

const cards = new Section ({
    items: initialCards,
    renderer: (cardInfo) => {
      const card = new Card(cardInfo, '#place', photoZoomPopup.open.bind(photoZoomPopup));
      cards.addItem(card.returnCard());
    } },
  '.places'
);

const user = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

const photoZoomPopup = new PopupWithImage('#pic-zoom');
const profileEditPopup = new PopupWithForm('#edit-profile', (evt) => {
  evt.preventDefault();
  user.setUserInfo(profileEditPopup._getInputValues());
  profileEditPopup.close();
});
const placeAddPopup = new PopupWithForm('#add-place', (evt) => {
  evt.preventDefault();
  const card = new Card(placeAddPopup._getInputValues(), '#place', photoZoomPopup.open.bind(photoZoomPopup));
  cards.addItem(card.returnCard());
  placeAddPopup.close();
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

buttonEdit.addEventListener('click', function() {
  profileEditPopup.changeInputValues(user.getUserInfo());
  profileEditPopup.open();
  validatorEdit.resetErrors(); // сделал через метод класса
});

buttonAdd.addEventListener('click', function () {
  placeAddPopup.open();
  validatorAdd.resetErrors();
});

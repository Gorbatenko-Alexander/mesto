// ------------------------------- Imports -------------------------------

import './index.css';

import {buttonEdit, buttonAdd, validationOptions, buttonEditAvatar} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

// ------------------------------- Functions -------------------------------

function createCard(placeInfo) {
  const card = new Card({
    placeInfo: placeInfo,
    selector: '#place',
    userId: user.id,
    handleCardClick: photoZoomPopup.open.bind(photoZoomPopup),
    deleteCallback: (cardElement, cardId) => {
      placeRemovePopup.open(cardElement, cardId)
    },
    addLikeCallback: (cardId, likesElement) => {
      api.addLike(cardId)
        .then((res) => {likesElement.textContent = res.likes.length});
    },
    removeLikeCallback: (cardId, likesElement) => {
      api.removeLike(cardId)
        .then((res) => {likesElement.textContent = res.likes.length});
    }
  });
  return card.returnCard();
}

function updateUserInfo() {
  return api.getUserInfo()
    .then((res) => {
      user.setUserInfo(res);
      return Promise.resolve();
    });
}

function updateCards() {
  return api.getInitialCards()
    .then((res) => {
      cards.renderItems(res);
    });
}

// ------------------------------- Objects -------------------------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '8135a91b-4470-4288-b181-7c53c6e7400a',
    'Content-Type': 'application/json'
  }
});

const user = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

const cards = new Section ((cardInfo) => {cards.addItem(createCard(cardInfo))}, '.places');

const photoZoomPopup = new PopupWithImage('#pic-zoom');

const profileEditPopup = new PopupWithForm('#edit-profile', (inputValues, buttonElement) => {
  buttonElement.value = "Сохранение...";
  api.changeUserInfo(inputValues)
    .then((userInfo) => {
      user.setUserInfo(userInfo);
      buttonElement.value = "Сохранить";
      profileEditPopup.close();
    });
});

const placeAddPopup = new PopupWithForm('#add-place', (inputValues, buttonElement) => {
  buttonElement.value = "Создание...";
  api.addCard(inputValues)
    .then((placeInfo) => {
      cards.addItem(createCard(placeInfo));
      buttonElement.value = "Создать";
      placeAddPopup.close();
    });
});

const avatarEditPopup = new PopupWithForm('#change-avatar', (inputValues, buttonElement) => {
  buttonElement.value = "Сохранение...";
  api.changeUserAvatar(inputValues)
    .then((userInfo) => {
      user.setUserInfo(userInfo);
      buttonElement.value = "Сохранить";
      avatarEditPopup.close();
    });
});

const placeRemovePopup = new PopupWithConfirmation('#confirm', (cardElement, cardId, buttonElement) => {
  buttonElement.value = "Удаление...";
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      buttonElement.value = "Да";
      placeRemovePopup.close();
    });
});

const validatorEdit = new FormValidator(validationOptions, profileEditPopup.form);
const validatorAdd = new FormValidator(validationOptions, placeAddPopup.form);
const validatorAvatar = new FormValidator(validationOptions, avatarEditPopup.form);

// ------------------------------- Code -------------------------------

updateUserInfo().then(updateCards());

photoZoomPopup.setEventListeners();
profileEditPopup.setEventListeners();
placeAddPopup.setEventListeners();
avatarEditPopup.setEventListeners();
placeRemovePopup.setEventListeners();

validatorEdit.enableValidation();
validatorAdd.enableValidation();
validatorAvatar.enableValidation();

buttonEdit.addEventListener('click', () => {
  profileEditPopup.changeInputValues(user.getUserInfo());
  profileEditPopup.open();
  validatorEdit.resetErrors(); // сделал через метод класса
});

buttonAdd.addEventListener('click', () => {
  placeAddPopup.open();
  validatorAdd.resetErrors();
});

buttonEditAvatar.addEventListener('click', () => {
  avatarEditPopup.open();
  validatorAvatar.resetErrors();
});

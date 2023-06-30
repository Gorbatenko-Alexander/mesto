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
    addLikeCallback: api.addLike.bind(api),
    removeLikeCallback: api.removeLike.bind(api)
  });
  return card.returnCard();
}

function updateUserInfo() {
  return api.getUserInfo()
    .then((res) => {
      user.setUserInfo(res);
      return Promise.resolve();
    })
    .catch((error) => {console.log(error)});
}

function updateCards() {
  return api.getInitialCards()
    .then((res) => {
      cards.renderItems(res);
    })
    .catch((error) => {console.log(error)});
}

// -------------------------------- Objects --------------------------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '02fcb90c-1852-4abc-a2c7-420ba480a85e',
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
      profileEditPopup.close(); // Перенёс закрытие попапа в then
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      buttonElement.value = "Сохранить";
    });
});

const placeAddPopup = new PopupWithForm('#add-place', (inputValues, buttonElement) => {
  buttonElement.value = "Создание...";
  api.addCard(inputValues)
    .then((placeInfo) => {
      cards.addItem(createCard(placeInfo));
      placeAddPopup.close(); // Перенёс закрытие попапа в then
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      buttonElement.value = "Создать";
    });
});

const avatarEditPopup = new PopupWithForm('#change-avatar', (inputValues, buttonElement) => {
  buttonElement.value = "Сохранение...";
  api.changeUserAvatar(inputValues)
    .then((userInfo) => {
      user.setUserInfo(userInfo);
      avatarEditPopup.close(); // Перенёс закрытие попапа в then
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      buttonElement.value = "Сохранить";
    });
});

const placeRemovePopup = new PopupWithConfirmation('#confirm', (cardElement, cardId, buttonElement) => {
  buttonElement.value = "Удаление...";
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      placeRemovePopup.close(); // Перенёс закрытие попапа в then
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      buttonElement.value = "Да";
    });
});

const validatorEdit = new FormValidator(validationOptions, profileEditPopup.form);
const validatorAdd = new FormValidator(validationOptions, placeAddPopup.form);
const validatorAvatar = new FormValidator(validationOptions, avatarEditPopup.form);

// ------------------------------- Code -------------------------------

updateUserInfo().then(updateCards);

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

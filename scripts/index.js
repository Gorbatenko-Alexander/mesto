let popup = document.querySelector(".popup");

let exit = document.querySelector(".popup__exit");
let edit = document.querySelector(".profile__edit-button");

let fieldName = document.querySelector(".popup__field[name='name']");
let fieldAbout = document.querySelector(".popup__field[name='about']");

let form = document.querySelector(".popup__fields")

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

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

function addPlace(placeInfo) {
  let place = placeTemplate.cloneNode(true);
  place.querySelector(".places__place-pic").alt = placeInfo.name;
  place.querySelector(".places__place-pic").src = placeInfo.link;
  place.querySelector(".places__place-title").textContent = placeInfo.name;
  places.append(place);
}

initialCards.forEach(addPlace);

function openPopup (objectName, act) {
  if (act === true) {
    objectName.classList.add(objectName.classList[0]+'_opened');
  } else {
    objectName.classList.remove(objectName.classList[0]+'_opened');
  }
}


edit.addEventListener('click', function() {
  openPopup(popup, true);
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});

exit.addEventListener('click', function() {
  openPopup(popup, false);
  form.reset();
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  openPopup(popup, false);
});

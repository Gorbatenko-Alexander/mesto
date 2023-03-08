let popup = document.querySelector(".popup");

let exit = document.querySelector(".popup__exit");
let edit = document.querySelector(".profile__edit-button");

let fieldName = document.querySelector(".popup__field[name='name']");
let fieldAbout = document.querySelector(".popup__field[name='about']");

let form = document.querySelector(".popup__fields")

let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__about");


function openPopup (objectName, act) {
  if (act === true) {
    objectName.classList.add(objectName.classList[0]+'_opened');
  } else {
    objectName.classList.remove(objectName.classList[0]+'_opened');
  }
}


edit.addEventListener('click', function() {
  openPopup(popup, true);
  fieldName.value = name.textContent;
  fieldAbout.value = about.textContent;
});

exit.addEventListener('click', function() {
  openPopup(popup, false);
  form.reset();
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  name.textContent = fieldName.value;
  about.textContent = fieldAbout.value;
  openPopup(popup, false);
});

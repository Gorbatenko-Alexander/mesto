let popup = document.querySelector(".pop-up");
let exit = document.querySelector(".pop-up__exit");
let edit = document.querySelector(".profile__edit-button");
let fields = document.querySelectorAll(".pop-up__field");
let form = document.querySelector(".pop-up__container")


edit.addEventListener('click', function() {
  let name = document.querySelector(".profile__name");
  let about = document.querySelector(".profile__about");
  popup.classList.add('pop-up_opened');
  fields[0].value = name.textContent;
  fields[1].value = about.textContent;
});

exit.addEventListener('click', function() {
  popup.classList.remove('pop-up_opened');
  fields[0].value = '';
  fields[1].value = '';
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let name = document.querySelector(".profile__name");
  let about = document.querySelector(".profile__about");
  name.textContent = fields[0].value;
  about.textContent = fields[1].value;
  popup.classList.remove('pop-up_opened');
});

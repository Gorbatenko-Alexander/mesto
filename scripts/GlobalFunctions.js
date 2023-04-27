// functions

export function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

export function placePopupExitListeners (popups) {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      const target = evt.target;

      if (target.classList.contains('popup__exit') || target === popup) {
        closePopup(popup);
      }
    });
  });
}

export function resetErrors (popup) {
  const errors = popup.querySelectorAll('.popup__error-message_shown');
  const errorFields = popup.querySelectorAll('.popup__field_invalid');
  errors.forEach((error) => {
    error.classList.remove('popup__error-message_shown')
  });
  errorFields.forEach((field) => {
    field.classList.remove('popup__field_invalid');
  });
}

// functions

export function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = closeByEsc.page.querySelector('.popup_opened');
    closePopup(popupOpened, closeByEsc.page);
  }
}

export function openPopup (popup, page) {
  popup.classList.add('popup_opened');
  closeByEsc.page = page;
  page.addEventListener('keydown', closeByEsc);
}

export function closePopup (popup, page) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByEsc);
}

export function placePopupExitListeners (popups, page) {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      const target = evt.target;
      const popup = evt.currentTarget;

      if (target.classList.contains('popup__exit') || target === popup) {
        closePopup(popup, page);
      }
    });
  });
}

import { isEscapeKey } from './utils.js';

const loadImageFormPopup = document.querySelector('.img-upload__overlay');
const loadImageFormPopupOpen = document.querySelector('.img-upload__input');
const loadImageFormPopupClose = loadImageFormPopup.querySelector('.img-upload__cancel');

const hashtagInput = loadImageFormPopup.querySelector('.text__hashtags');
const commentInput = loadImageFormPopup.querySelector('.text__description');

let onDocumentKeydown = () => {};

const openLoadImageForm = () => {
  loadImageFormPopup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeLoadImageForm = () => {
  loadImageFormPopup.classList.add('hidden');
  loadImageFormPopupOpen.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

loadImageFormPopupOpen.addEventListener('change', () => {
  openLoadImageForm();
});

loadImageFormPopupClose.addEventListener('click', () => {
  closeLoadImageForm();
});

onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!(document.activeElement === hashtagInput) || !(document.activeElement === commentInput)) {
      evt.preventDefault();
      closeLoadImageForm();
    }
  }
};

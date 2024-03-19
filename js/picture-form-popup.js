import { isEscapeKey } from './utils.js';
import { doPictureBigger, doPictureSmaller, resetImageScale, changeImageEffect, clearEffects } from './picture-filter.js';

const loadImageFormPopup = document.querySelector('.img-upload__overlay');
const loadImageFormPopupOpen = document.querySelector('.img-upload__input');
const loadImageFormPopupClose = loadImageFormPopup.querySelector('.img-upload__cancel');

const hashtagInput = loadImageFormPopup.querySelector('.text__hashtags');
const commentInput = loadImageFormPopup.querySelector('.text__description');

const scaleSmallerButton = loadImageFormPopup.querySelector('.scale__control--smaller');
const scaleBiggerButton = loadImageFormPopup.querySelector('.scale__control--bigger');

const effectChoseButtons = document.querySelectorAll('.effects__radio');

let onDocumentKeydown = () => {};

const openLoadImageForm = () => {
  loadImageFormPopup.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.addEventListener('click', doPictureSmaller);
  scaleBiggerButton.addEventListener('click', doPictureBigger);

  effectChoseButtons.forEach((button) => {
    button.addEventListener('change', () => {
      changeImageEffect(button);
    });
  });

};

const closeLoadImageForm = () => {
  loadImageFormPopup.classList.add('hidden');
  loadImageFormPopupOpen.value = '';
  resetImageScale();

  document.removeEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.removeEventListener('click', doPictureSmaller);
  scaleBiggerButton.removeEventListener('click', doPictureBigger);

  clearEffects();
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

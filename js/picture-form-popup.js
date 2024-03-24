import { addModalOpen, isEscapeKey } from './utils.js';
import { doPictureBigger, doPictureSmaller, resetImageScale } from './picture_scale.js';
import { changeImageEffect, clearEffects, createSlider } from './picture-filter.js';
import { checkForm } from './form-validation.js';

const loadImageFormPopup = document.querySelector('.img-upload__overlay');
const loadImageFormPopupOpen = document.querySelector('.img-upload__input');
const loadImageFormPopupClose = loadImageFormPopup.querySelector('.img-upload__cancel');

//const imagePreview = loadImageFormPopup.querySelector('.img-upload__preview img');

const hashtagInput = loadImageFormPopup.querySelector('.text__hashtags');
const commentInput = loadImageFormPopup.querySelector('.text__description');

const scaleSmallerButton = loadImageFormPopup.querySelector('.scale__control--smaller');
const scaleBiggerButton = loadImageFormPopup.querySelector('.scale__control--bigger');

const effectRadioButton = document.querySelector('.effects__list');

const addEffects = () => {
  const checkedButton = effectRadioButton.querySelector('input[name="effect"]:checked').value;
  changeImageEffect(checkedButton);
};

let onDocumentKeydown = () => {};

const openLoadImageForm = () => {
  //imagePreview.src = loadImageFormPopupOpen.value;
  checkForm();
  createSlider();

  addModalOpen();

  loadImageFormPopup.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.addEventListener('click', doPictureSmaller);
  scaleBiggerButton.addEventListener('click', doPictureBigger);
  effectRadioButton.addEventListener('change', addEffects);
};

const closeLoadImageForm = () => {
  loadImageFormPopup.classList.add('hidden');
  loadImageFormPopupOpen.value = '';
  resetImageScale();

  addModalOpen();

  document.removeEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.removeEventListener('click', doPictureSmaller);
  scaleBiggerButton.removeEventListener('click', doPictureBigger);
  effectRadioButton.removeEventListener('change', addEffects);

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

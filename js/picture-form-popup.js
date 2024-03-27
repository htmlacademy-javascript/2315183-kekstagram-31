import { addModalOpen, isEscapeKey } from './utils.js';
import { doPictureBigger, doPictureSmaller, resetImageScale } from './picture_scale.js';
import { changeImageEffect, clearEffects, createSlider } from './picture-filter.js';
import { checkForm } from './form-validation.js';
import { deleteSlider } from './picture-filter.js';

const loadImageFormPopup = document.querySelector('.img-upload__overlay');
const loadImageFormPopupOpen = document.querySelector('.img-upload__input');
const loadImageFormPopupClose = loadImageFormPopup.querySelector('.img-upload__cancel');

//const imagePreview = document.querySelector('.img-upload__preview img');

const hashtagInput = loadImageFormPopup.querySelector('.text__hashtags');
const commentInput = loadImageFormPopup.querySelector('.text__description');

const scaleSmallerButton = loadImageFormPopup.querySelector('.scale__control--smaller');
const scaleBiggerButton = loadImageFormPopup.querySelector('.scale__control--bigger');

const effectRadioButton = document.querySelector('.effects__list');

const addEffects = () => {
  const checkedButton = effectRadioButton.querySelector('input[name="effect"]:checked').value;
  changeImageEffect(checkedButton);
};

const clearInputs = () => {
  hashtagInput.textContent = '';
  commentInput.textContent = '';
};

const clearForm = () => {
  loadImageFormPopupOpen.value = '';

  effectRadioButton.querySelectorAll('.effects__radio')[0].checked = true;

  clearEffects();
  clearInputs();
  resetImageScale();
};

let onDocumentKeydown = () => {};

const openLoadImageForm = () => {
  clearForm();

  checkForm();
  createSlider();
  addEffects();

  addModalOpen();

  loadImageFormPopup.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.addEventListener('click', doPictureSmaller);
  scaleBiggerButton.addEventListener('click', doPictureBigger);
  effectRadioButton.addEventListener('change', addEffects);
};

const closeLoadImageForm = () => {
  loadImageFormPopup.classList.add('hidden');
  //clearForm();

  deleteSlider();

  addModalOpen();

  document.removeEventListener('keydown', onDocumentKeydown);
  scaleSmallerButton.removeEventListener('click', doPictureSmaller);
  scaleBiggerButton.removeEventListener('click', doPictureBigger);
  effectRadioButton.removeEventListener('change', addEffects);
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

export { closeLoadImageForm, onDocumentKeydown, clearForm };

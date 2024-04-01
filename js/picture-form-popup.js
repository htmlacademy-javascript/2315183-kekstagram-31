import { addModalOpen, isEscapeKey } from './utils.js';
import { onPictureBigger, onPictureSmaller, resetImageScale } from './picture-scale.js';
import { changeImageEffect, clearEffects, createSlider } from './picture-filter.js';
import { checkForm, destroyPristine, initValidation, resetValidate } from './form-validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const loadImageFormPopup = document.querySelector('.img-upload__overlay');
const loadImageFormPopupOpen = document.querySelector('.img-upload__input');
const loadImageFormPopupClose = loadImageFormPopup.querySelector('.img-upload__cancel');

const loadImageForm = document.querySelector('.img-upload__form');

const imagePreview = loadImageForm.querySelector('.img-upload__preview img');
const imageEffectPreview = loadImageForm.querySelectorAll('.effects__preview');

const hashtagInput = loadImageFormPopup.querySelector('.text__hashtags');
const commentInput = loadImageFormPopup.querySelector('.text__description');

const scaleSmallerButton = loadImageFormPopup.querySelector('.scale__control--smaller');
const scaleBiggerButton = loadImageFormPopup.querySelector('.scale__control--bigger');

const effectRadioButton = document.querySelector('.effects__list');

let onDocumentKeydown = () => {};

const onAddEffects = () => {
  const checkedButton = effectRadioButton.querySelector('input[name="effect"]:checked').value;
  changeImageEffect(checkedButton);
};

const clearForm = () => {
  effectRadioButton.querySelectorAll('.effects__radio')[0].checked = true;

  clearEffects();
  resetImageScale();
  onAddEffects();
  resetValidate();
  destroyPristine();
};

const setPersonalImage = () => {
  const image = loadImageFormPopupOpen.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => imageName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(image);

    imageEffectPreview.forEach((item) => {
      item.style.backgroundImage = `url("${imagePreview.src}")`;
    });
  }
};

const openLoadImageForm = () => {
  initValidation();
  addModalOpen();
  setPersonalImage();

  loadImageFormPopup.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  checkForm();
};

const closeLoadImageForm = () => {
  loadImageFormPopupOpen.value = '';
  loadImageForm.reset();
  clearForm();
  loadImageFormPopup.classList.add('hidden');

  addModalOpen();

  document.removeEventListener('keydown', onDocumentKeydown);
};

loadImageFormPopupOpen.addEventListener('change', () => {
  openLoadImageForm();
});

loadImageFormPopupClose.addEventListener('click', () => {
  closeLoadImageForm();
});

onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeLoadImageForm();
  }
};

createSlider();

scaleSmallerButton.addEventListener('click', onPictureSmaller);
scaleBiggerButton.addEventListener('click', onPictureBigger);
effectRadioButton.addEventListener('change', onAddEffects);

export { closeLoadImageForm, onDocumentKeydown, clearForm, onAddEffects };

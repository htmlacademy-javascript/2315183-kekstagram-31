import { createErrorPopup, createSuccessPopup, blockSubmitButton, unlockSubmitButton } from './information-popups.js';
import { sendData } from './api.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const WrongMasseges = {
  HASTAG_TEXT: 'Неверная запись хештегов',
  HASHTAG_COUNT: 'Хэштегов должно быть не больше пяти',
  HASHTAG_DUPLICATE: 'Повторяющийся хэштег',
  COMMENT_LENGTH: 'Длина комментария недолжна быть больше 140 символов'
};

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const loadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = loadImageForm.querySelector('.text__hashtags');
const commentInput = loadImageForm.querySelector('.text__description');

let pristine;

const getArrayOfHashtags = (value) => value.trim().replace(/\s+/g,' ').split(' ');

const checkDuplicates = (array) => (new Set(array)).size === array.length;

const checkHashtags = (value) => {
  const hashtagArray = getArrayOfHashtags(value);

  if (value === '') {
    return true;
  }
  return hashtagArray.every((element) => HASHTAG_REGEX .test(element));
};

const checkCountHashtags = (value) => {
  const hashtagArray = getArrayOfHashtags(value);

  return hashtagArray.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagsDuplicates = (value) => {
  const hashtagArray = getArrayOfHashtags(value);

  return checkDuplicates(hashtagArray.map((hashtag) => hashtag.toLowerCase()));
};

const checkCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;

const initValidation = () => {
  pristine = new Pristine(loadImageForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  pristine.addValidator(hashtagInput, checkHashtags, WrongMasseges.HASTAG_TEXT, 3, true);
  pristine.addValidator(hashtagInput, checkHashtagsDuplicates, WrongMasseges.HASHTAG_DUPLICATE, 2, true);
  pristine.addValidator(hashtagInput, checkCountHashtags, WrongMasseges.HASHTAG_COUNT, 1, true);
  pristine.addValidator(commentInput, checkCommentLength, WrongMasseges.COMMENT_LENGTH);
};

const isValidated = () => pristine.validate();

const checkForm = () => {
  pristine.validate();
};

const resetValidate = () => {
  pristine.reset();
};

const destroyPristine = () => {
  pristine.destroy();
};

const setPostFormSubmit = (onSuccess) => {
  loadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    initValidation();
    if(isValidated()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          createSuccessPopup();
        })
        .catch(() => {
          createErrorPopup();
        })
        .finally(unlockSubmitButton);
    }
  });
};

export { checkForm, pristine, resetValidate, initValidation, setPostFormSubmit, destroyPristine, isValidated };

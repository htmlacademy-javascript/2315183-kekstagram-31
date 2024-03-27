import { sendData } from './api.js';
import { clearForm, onDocumentKeydown } from './picture-form-popup.js';
import { showInformationAlert, isEscapeKey } from './utils.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const WrongMasseges = {
  HASTAG_TEXT: 'Неверная запись хештегов',
  HASHTAG_COUNT: 'Хэштегов должно быть не больше пяти',
  HASHTAG_DUPLICATE: 'Повторяющийся хэштег',
  COMMENT_LENGTH: 'Длина комментария недолжна быть больше 140 символов'
};

const InfoPopups = {
  ERROR: 'error',
  SUCCESS: 'success'
};

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const loadImageForm = document.querySelector('.img-upload__form');
const loadImageFormInput = document.querySelector('.img-upload__input');
const hashtagInput = loadImageForm.querySelector('.text__hashtags');
const commentInput = loadImageForm.querySelector('.text__description');

const successPopup = showInformationAlert(InfoPopups.SUCCESS);
const successButton = successPopup.querySelector(`.${InfoPopups.SUCCESS}__button`);
successPopup.classList.add('hidden');

const errorPopup = showInformationAlert(InfoPopups.ERROR);
const errorButton = errorPopup.querySelector(`.${InfoPopups.ERROR}__button`);
errorPopup.classList.add('hidden');

const pristine = new Pristine(loadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrappe--invalid',
  successClass: 'img-upload__field-wrappe--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkDuplicates = (array) => (new Set(array)).size === array.length;

const checkHashtags = (value) => {
  const hashtagArray = value.trim().split(' ');

  if (value === '') {
    return true;
  }
  return hashtagArray.every((element) => HASHTAG_REGEX .test(element));
};

const checkCountHashtags = (value) => {
  const hashtagArray = value.trim().split(' ');

  return hashtagArray.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagsDuplicates = (value) => {
  const hashtagArray = value.trim().split(' ');

  return checkDuplicates(hashtagArray.map((hashtag) => hashtag.toLowerCase()));
};

const checkCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagInput, checkHashtags, WrongMasseges.HASTAG_TEXT);
pristine.addValidator(hashtagInput, checkCountHashtags, WrongMasseges.HASHTAG_COUNT);
pristine.addValidator(hashtagInput, checkHashtagsDuplicates, WrongMasseges.HASHTAG_DUPLICATE);
pristine.addValidator(commentInput, checkCommentLength, WrongMasseges.COMMENT_LENGTH);

const checkForm = () => {
  pristine.validate();
};

let valuePopup;

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    valuePopup.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('keydown', onKeydown);
  }
};

const addEscapeKeydownOnPopup = (popup) => {
  document.removeEventListener('keydown', onDocumentKeydown);
  popup.classList.remove('hidden');
  valuePopup = popup;
  document.addEventListener('keydown', onKeydown);
};

const showLoadInfoPopup = (parametr) => {
  if (parametr === InfoPopups.SUCCESS) {
    addEscapeKeydownOnPopup(successPopup);
  } else {
    addEscapeKeydownOnPopup(errorPopup);
  }
};

successButton.addEventListener('click', () => {
  successPopup.classList.add('hidden');
  loadImageForm.reset();
  clearForm();
});

errorButton.addEventListener('click', () => {
  errorPopup.classList.add('hidden');

  const imageInput = loadImageFormInput.value.split(/(\\|\/)/g).pop(); //loadImageFormInput.value;
  const file = new File([''], imageInput, {type:'image/'});
  const dataTransfer = new DataTransfer();

  loadImageForm.reset();
  dataTransfer.items.add(file);
  loadImageFormInput.files = dataTransfer.files;

  clearForm();
  pristine.validate();
});

const setPostFormSubmit = (onSuccess) => {
  loadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValidated = pristine.validate();
    if(isValidated) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showLoadInfoPopup(InfoPopups.SUCCESS);
        })
        .catch(() => {
          showLoadInfoPopup(InfoPopups.ERROR);
        });
    } else {
      showLoadInfoPopup(InfoPopups.ERROR);
    }
  });
};

export { checkForm, setPostFormSubmit };

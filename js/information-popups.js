import { sendData } from './api.js';
import { checkForm, pristine } from './form-validation.js';
import { clearForm, onDocumentKeydown } from './picture-form-popup.js';
import { showInformationAlert, isEscapeKey } from './utils.js';

const InfoPopups = {
  ERROR: 'error',
  SUCCESS: 'success'
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const loadImageForm = document.querySelector('.img-upload__form');
const loadImageFormInput = document.querySelector('.img-upload__input');
const submitButton = loadImageForm.querySelector('.img-upload__submit');

let successButton;
let successPopup;
let errorButton;
let errorPopup;
let valuePopup;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const clearFormOnErrorButton = () => {
  const imageInput = loadImageFormInput.value.split(/(\\|\/)/g).pop();
  const file = new File([''], imageInput, {type:'image/'});
  const dataTransfer = new DataTransfer();

  loadImageForm.reset();
  dataTransfer.items.add(file);
  loadImageFormInput.files = dataTransfer.files;

  unlockSubmitButton();

  clearForm();
  checkForm();
};

const onSuccessButtonClick = () => {
  loadImageForm.reset();
  clearForm();

  successPopup.classList.add('hidden');
  successButton.removeEventListener('click', onSuccessButtonClick);
};

const onErrorButtonClick = () => {
  errorPopup.classList.add('hidden');

  clearFormOnErrorButton();

  errorButton.removeEventListener('click', onErrorButtonClick);
};

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

  unlockSubmitButton();

  //loadImageForm.reset();
  //clearForm();
  checkForm();
};

const showLoadInfoPopup = (parametr) => {
  if (parametr === InfoPopups.SUCCESS) {
    addEscapeKeydownOnPopup(successPopup);
    successButton.removeEventListener('click', onSuccessButtonClick);
  } else {
    addEscapeKeydownOnPopup(errorPopup);
    errorButton.removeEventListener('click', onErrorButtonClick);
  }
};

const onClickSuccessPopupOutside = (evt) => {
  const popupSuccess = document.querySelector(`.${InfoPopups.SUCCESS}__inner`);
  const clickSuccess = evt.composedPath().includes(popupSuccess);

  if (!clickSuccess) {
    successPopup.classList.add('hidden');

    document.removeEventListener('click', onClickSuccessPopupOutside);
  }
};

const onClickErrorPopupOutside = (evt) => {
  const popupError = document.querySelector(`.${InfoPopups.ERROR}__inner`);
  const clickError = evt.composedPath().includes(popupError);

  if (!clickError) {
    errorPopup.classList.add('hidden');

    clearFormOnErrorButton();

    document.removeEventListener('click', onClickErrorPopupOutside);
  }
};

const createSuccessPopup = () => {
  successPopup = showInformationAlert(InfoPopups.SUCCESS);
  successButton = successPopup.querySelector(`.${InfoPopups.SUCCESS}__button`);
  successPopup.classList.remove('hidden');

  showLoadInfoPopup(InfoPopups.SUCCESS);
  successButton.addEventListener('click', onSuccessButtonClick);

  document.addEventListener('click', onClickSuccessPopupOutside);
};

const createErrorPopup = () => {
  errorPopup = showInformationAlert(InfoPopups.ERROR);
  errorButton = errorPopup.querySelector(`.${InfoPopups.ERROR}__button`);

  showLoadInfoPopup(InfoPopups.ERROR);
  errorButton.addEventListener('click', onErrorButtonClick);

  document.addEventListener('click', onClickErrorPopupOutside);
};

const setPostFormSubmit = (onSuccess) => {
  loadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidated = pristine.validate();
    blockSubmitButton();
    if(isValidated) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          createSuccessPopup();
        })
        .catch(() => {
          createErrorPopup();
        })
        .finally(unlockSubmitButton);
    } else {
      createErrorPopup();
    }
  });
};

export { setPostFormSubmit };

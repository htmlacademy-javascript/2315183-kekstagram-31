import { clearForm, onDocumentKeydown } from './picture-form-popup.js';
import { showInformationAlert, isEscapeKey, appendPopupInBody } from './utils.js';
import { destroyPristine } from './form-validation.js';

const InfoPopups = {
  ERROR: 'error',
  SUCCESS: 'success'
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const loadImageForm = document.querySelector('.img-upload__form');
const submitButton = loadImageForm.querySelector('.img-upload__submit');

let successPopup;
let successInnerPopup;
let errorPopup;
let errorInnerPopup;

const successPopupFragment = showInformationAlert(InfoPopups.SUCCESS);
const errorPopupFragment = showInformationAlert(InfoPopups.ERROR);

// const successPopup = appendPopupInBody(InfoPopups.SUCCESS, successPopupFragment);
// const successButton = successPopup.querySelector(`.${InfoPopups.SUCCESS}__button`);
// const successInnerPopup = successPopup.querySelector(`.${InfoPopups.SUCCESS}__inner`);
// successPopup.classList.add('hidden');

// const errorPopup = appendPopupInBody(InfoPopups.ERROR, errorPopupFragment);
// const errorButton = errorPopup.querySelector(`.${InfoPopups.ERROR}__button`);
// const errorInnerPopup = errorPopup.querySelector(`.${InfoPopups.ERROR}__inner`);
// errorPopup.classList.add('hidden');

let valuePopup;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onSuccessButtonClick = () => {
  loadImageForm.reset();
  clearForm();
  successPopup.classList.add('hidden');
  successPopup.remove();
};

const onErrorButtonClick = () => {
  errorPopup.classList.add('hidden');

  errorPopup.remove();
};

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    valuePopup.remove();
    loadImageForm.reset();
    clearForm();
    document.addEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('keydown', onKeydown);
  }
};

const addEscapeKeydownOnPopup = (popup) => {
  document.removeEventListener('keydown', onDocumentKeydown);
  valuePopup = popup;
  document.addEventListener('keydown', onKeydown);

  unlockSubmitButton();

  destroyPristine();
};

const showLoadInfoPopup = (parametr) => {
  if (parametr === InfoPopups.SUCCESS) {
    addEscapeKeydownOnPopup(successPopup);
  } else {
    addEscapeKeydownOnPopup(errorPopup);
  }
};

const onClickSuccessPopupOutside = (evt) => {
  const clickSuccess = evt.composedPath().includes(successInnerPopup);

  if (!clickSuccess) {
    successPopup.classList.add('hidden');
    successPopup.remove();
  }
};

const onClickErrorPopupOutside = (evt) => {
  const clickError = evt.composedPath().includes(errorInnerPopup);

  if (!clickError) {
    errorPopup.classList.add('hidden');
    errorPopup.remove();
  }
};

const createElementPopup = (elementFragment, infoTitle) => {
  const elementCloneFragment = elementFragment.cloneNode(true);

  const elementPopup = appendPopupInBody(infoTitle, elementCloneFragment);
  const elementButton = elementPopup.querySelector(`.${infoTitle}__button`);

  if (infoTitle === InfoPopups.SUCCESS) {
    elementButton.addEventListener('click', onSuccessButtonClick);
    elementPopup.addEventListener('click', onClickSuccessPopupOutside);
  } else {
    elementButton.addEventListener('click', onErrorButtonClick);
    elementPopup.addEventListener('click', onClickErrorPopupOutside);
  }

  return elementPopup;
};

const createSuccessPopup = () => {
  successPopup = createElementPopup(successPopupFragment, InfoPopups.SUCCESS);
  successInnerPopup = successPopup.querySelector(`.${InfoPopups.SUCCESS}__inner`);

  showLoadInfoPopup(InfoPopups.SUCCESS);
};

const createErrorPopup = () => {
  errorPopup = createElementPopup(errorPopupFragment, InfoPopups.ERROR);
  errorInnerPopup = errorPopup.querySelector(`.${InfoPopups.ERROR}__inner`);

  showLoadInfoPopup(InfoPopups.ERROR);
};

export { createErrorPopup, createSuccessPopup, blockSubmitButton, unlockSubmitButton };

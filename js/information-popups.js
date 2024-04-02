import { clearForm, onDocumentKeydown } from './picture-form-popup.js';
import { showInformationAlert, isEscapeKey, appendPopupInBody } from './utils.js';
import { destroyPristine } from './form-validation.js';

const InfoPopup = {
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

const successPopupFragment = showInformationAlert(InfoPopup.SUCCESS);
const errorPopupFragment = showInformationAlert(InfoPopup.ERROR);

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
  valuePopup = popup;

  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onKeydown);

  unlockSubmitButton();
  destroyPristine();
};

const showLoadInfoPopup = (parametr) => {
  if (parametr === InfoPopup.SUCCESS) {
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

  if (infoTitle === InfoPopup.SUCCESS) {
    elementButton.addEventListener('click', onSuccessButtonClick);
    elementPopup.addEventListener('click', onClickSuccessPopupOutside);
  } else {
    elementButton.addEventListener('click', onErrorButtonClick);
    elementPopup.addEventListener('click', onClickErrorPopupOutside);
  }

  return elementPopup;
};

const showSuccessPopup = () => {
  successPopup = createElementPopup(successPopupFragment, InfoPopup.SUCCESS);
  successInnerPopup = successPopup.querySelector(`.${InfoPopup.SUCCESS}__inner`);

  showLoadInfoPopup(InfoPopup.SUCCESS);
};

const showErrorPopup = () => {
  errorPopup = createElementPopup(errorPopupFragment, InfoPopup.ERROR);
  errorInnerPopup = errorPopup.querySelector(`.${InfoPopup.ERROR}__inner`);

  showLoadInfoPopup(InfoPopup.ERROR);
};

export { showErrorPopup, showSuccessPopup, blockSubmitButton, unlockSubmitButton };

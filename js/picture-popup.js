import { isEscapeKey } from './utils.js';
import { generateComments, commentsList, countClear } from './generate-comments-block.js';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');

const modalOpen = document.querySelector('body');

const commentLoaderButton = bigPicturePopup.querySelector('.comments-loader');
let onLoadCommentsClick;

const clearBigPicturePopup = () => {
  commentsList.textContent = '';
  countClear();
};

const drawBigPicturePopup = (miniature) => {
  const {url, likes, description, comments} = miniature;

  const bigPicture = document.querySelector('.big-picture__img img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const socialCaption = document.querySelector('.social__caption');

  bigPicture.src = url;
  bigPicture.alt = description;
  bigPictureLikes.textContent = likes;
  socialCaption.textContent = description;

  generateComments(comments);

  onLoadCommentsClick = (evt) => {
    evt.preventDefault();
    generateComments(comments);
  };

};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup () {
  bigPicturePopup.classList.remove('hidden');
  modalOpen.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentLoaderButton.addEventListener('click', onLoadCommentsClick);
}

function closePopup() {
  bigPicturePopup.classList.add('hidden');
  modalOpen.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoaderButton.removeEventListener('click', onLoadCommentsClick);
  clearBigPicturePopup();
}

bigPictureClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

export { openPopup, bigPicturePopup, drawBigPicturePopup };

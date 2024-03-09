import { isEscapeKey } from './utils.js';
import { drawBigPicturePopup, clearBigPicturePopup } from './draw_miniatures.js';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelectorAll('.picture');
const bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');

const commentsCount = bigPicturePopup.querySelector('.social__comment-count');
const commentLoader = bigPicturePopup.querySelector('.comments-loader');

const modalOpen = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  bigPicturePopup.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  modalOpen.classList.add('.modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closePopup() {
  bigPicturePopup.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  modalOpen.classList.remove('.modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  clearBigPicturePopup();
}

bigPictureOpen.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawBigPicturePopup(picture);
    openPopup();
  });
});

bigPictureClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

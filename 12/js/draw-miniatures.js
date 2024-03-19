import { drawBigPicturePopup, openPopup } from './picture-popup.js';

const picturesList = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const drawMiniatures = (miniatures) => {
  miniatures.forEach((miniature) => {
    const {id, url, description, likes, comments} = miniature;
    const miniatureElement = miniatureTemplate.cloneNode(true);

    const picture = miniatureElement.querySelector('.picture__img');
    const countComments = miniatureElement.querySelector('.picture__comments');
    const countLikes = miniatureElement.querySelector('.picture__likes');

    picture.src = url;
    picture.alt = description;
    picture.id = id.toString();
    countComments.textContent = comments.length;
    countLikes.textContent = likes;

    miniatureElement.addEventListener('click', () => {
      drawBigPicturePopup(miniature);
      openPopup();
    });

    similarListFragment.append(miniatureElement);
  });
  picturesList.append(similarListFragment);
};

export { drawMiniatures };

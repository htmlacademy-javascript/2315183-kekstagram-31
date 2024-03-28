import { drawBigPicturePopup, openPopup } from './picture-popup.js';
import { sortByFilter, getCountMiniatures } from './filter-miniature.js';

const picturesList = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const drawMiniatures = (miniatures) => {
  miniatures
    .slice(0, getCountMiniatures(miniatures))
    .sort(sortByFilter)
    .forEach((miniature) => {
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

  const pictures = picturesList.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });

  picturesList.append(similarListFragment);
};

export { drawMiniatures };

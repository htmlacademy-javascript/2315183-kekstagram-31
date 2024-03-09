import { createPosts } from './create-post.js';
import { createElement } from './utils.js';

const picturesList = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const commentsList = document.querySelector('.social__comments');

const miniatures = createPosts();

const similarListFragment = document.createDocumentFragment();

const drawMiniatures = () => {
  miniatures.forEach(({id, url, description, likes, comments}) => {
    const miniatureElement = miniatureTemplate.cloneNode(true);

    const picture = miniatureElement.querySelector('.picture__img');
    const countComments = miniatureElement.querySelector('.picture__comments');
    const countLikes = miniatureElement.querySelector('.picture__likes');

    picture.src = url;
    picture.alt = description;
    picture.id = id.toString();
    countComments.textContent = comments.length;
    countLikes.textContent = likes;

    similarListFragment.append(miniatureElement);
  });
  picturesList.append(similarListFragment);
};

const drawBigPicturePopup = (item) => {
  commentsList.textContent = '';

  const picture = item.querySelector('.picture__img');
  const miniature = miniatures.find((element) => element.id === parseInt(picture.id, 10));
  const {likes, description, comments} = miniature;

  const bigPicture = document.querySelector('.big-picture__img').children[0];
  const bigPictureLikes = document.querySelector('.likes-count');
  const socialCaption = document.querySelector('.social__caption');

  bigPicture.src = picture.src;
  bigPicture.alt = picture.alt;
  bigPictureLikes.textContent = likes;
  socialCaption.textContent = description;

  const countCommentsShow = document.querySelector('.social__comment-shown-count');
  const countCommentsTotal = document.querySelector('.social__comment-total-count');

  countCommentsShow.textContent = comments.length;
  countCommentsTotal.textContent = comments.length;

  // Создание шаблона под комментарий
  const commentTemplate = createElement('li', 'social__comment');
  const commentImg = createElement('img', 'social__picture');
  const commentMessage = createElement('p', 'social__text');

  commentTemplate.append(commentImg);
  commentTemplate.append(commentMessage);

  const commentListFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);

    const commentUserImg = commentElement.querySelector('.social__picture');
    const commentUserMessage = commentElement.querySelector('.social__text');

    commentUserImg.src = avatar;
    commentUserImg.alt = name;
    commentUserMessage.textContent = message;

    commentListFragment.append(commentElement);
  });
  commentsList.append(commentListFragment);
};

const clearBigPicturePopup = () => {
  commentsList.textContent = '';
};

drawMiniatures();

export { drawBigPicturePopup, drawMiniatures, clearBigPicturePopup };

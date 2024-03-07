import { createPosts } from './create-post';

const picturesList = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const miniatures = createPosts();

const similarListFragment = document.createDocumentFragment();

miniatures.forEach(({url, description, likes, comments}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);

  const picture = miniatureElement.querySelector('.picture__img');
  const countComments = miniatureElement.querySelector('.picture__comments');
  const countLikes = miniatureElement.querySelector('.picture__likes');

  picture.src = url;
  picture.alt = description;
  countComments.textContent = comments.length;
  countLikes.textContent = likes;

  similarListFragment.append(miniatureElement);
});

picturesList.append(similarListFragment);

import { createElement } from './utils.js';

const CountCommentValue = {
  START_COUNT: 0,
  STEP_COUNT: 5
};

const commentsList = document.querySelector('.social__comments');

let count = CountCommentValue.START_COUNT;

const generateCommentsTemplate = () => {
  const commentTemplate = createElement('li', 'social__comment');
  const commentImg = createElement('img', 'social__picture');
  const commentMessage = createElement('p', 'social__text');

  commentTemplate.append(commentImg);
  commentTemplate.append(commentMessage);

  return commentTemplate;
};

const generateComments = (comments) => {
  const commentTemplate = generateCommentsTemplate();

  const commentListFragment = document.createDocumentFragment();

  const countCommentsShow = document.querySelector('.social__comment-shown-count');
  const countCommentsTotal = document.querySelector('.social__comment-total-count');

  const loadMoreButton = document.querySelector('.social__comments-loader');

  if (count + CountCommentValue.STEP_COUNT >= comments.length) {
    loadMoreButton.classList.add('hidden');
    countCommentsShow.textContent = comments.length;
  } else {
    loadMoreButton.classList.remove('hidden');
    countCommentsShow.textContent = count + CountCommentValue.STEP_COUNT;
  }

  countCommentsTotal.textContent = comments.length;

  comments
    .slice(count, count + CountCommentValue.STEP_COUNT)
    .forEach((comment) => {
      const {avatar, name, message} = comment;
      const commentElement = commentTemplate.cloneNode(true);

      const commentUserImg = commentElement.querySelector('.social__picture');
      const commentUserMessage = commentElement.querySelector('.social__text');

      commentUserImg.src = avatar;
      commentUserImg.alt = name;
      commentUserMessage.textContent = message;

      commentListFragment.append(commentElement);
    });

  commentsList.append(commentListFragment);

  count += CountCommentValue.STEP_COUNT;
};

const countClear = () => {
  count = CountCommentValue.START_COUNT;
};

export { generateCommentsTemplate, generateComments, commentsList, countClear };

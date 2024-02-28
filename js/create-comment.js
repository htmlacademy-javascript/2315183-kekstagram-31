import { COMMENT_MESSAGES, USER_NAMES, RangeIDComment } from './consts.js';
import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './utils.js';

const generateIdComments = createRandomIdFromRangeGenerator(RangeIDComment.MIN, RangeIDComment.MAX);

const createComment = () => ({
  id: generateIdComments(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENT_MESSAGES)} ${getRandomArrayElement(COMMENT_MESSAGES)}`,
  name: getRandomArrayElement(USER_NAMES)
});


export { createComment };

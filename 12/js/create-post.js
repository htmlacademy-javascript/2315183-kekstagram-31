import { DESCRIPTIONS, RangeIDs, RangeURLs, RangeLikes, countOfComments, POST_COUNT } from './consts.js';
import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './utils.js';
import { createComment } from './create-comment.js';

const generateId = createRandomIdFromRangeGenerator (RangeIDs.MIN, RangeIDs.MAX);
const photosRandomUrl = createRandomIdFromRangeGenerator(RangeURLs.MIN, RangeURLs.MAX);

const createPost = () => ({
  id: generateId(),
  url: `photos/${photosRandomUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(RangeLikes.MIN, RangeLikes.MAX),
  comments: Array.from({length: getRandomInteger(countOfComments.MIN, countOfComments.MAX)}, createComment)
});

const createPosts = () => Array.from({length: POST_COUNT}, createPost);

export {createPosts};

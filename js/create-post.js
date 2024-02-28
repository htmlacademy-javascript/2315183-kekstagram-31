import { DESCRIPTIONS, RangeIDs, RangeURLs, RangeLikes, countOfComments, POST_COUNT } from './data.js';
import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './random-generators';
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

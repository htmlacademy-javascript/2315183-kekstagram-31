
const DESCRIPTIONS = [
  'Красивое место',
  'I Love U',
  'Where i am?',
  'Taste food',
  'Beautiful sound'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Анастасия',
  'Елизавета',
  'Ольга',
  'Алексей',
  'Семён'
];

const POST_COUNT = 25;

const RangeIDs = {
  MIN: 1,
  MAX: 25
};

const RangeIDComment = {
  MIN: 1,
  MAX: 1000
};

const RangeURLs = {
  MIN: 1,
  MAX: 25
};

const RangeLikes = {
  MIN: 15,
  MAX: 200
};

const countOfComments = {
  MIN: 0,
  MAX: 25
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Создание уникальных ID и URL адресов
const generateId = createRandomIdFromRangeGenerator (RangeIDs.MIN, RangeIDs.MAX);

const generateIdComments = createRandomIdFromRangeGenerator(RangeIDComment.MIN, RangeIDComment.MAX);

const photosRandomUrl = createRandomIdFromRangeGenerator(RangeURLs.MIN, RangeURLs.MAX);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: generateIdComments(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENT_MESSAGES)} ${getRandomArrayElement(COMMENT_MESSAGES)}`,
  name: getRandomArrayElement(USER_NAMES)
});

const createPost = () => ({
  id: generateId(),
  url: `photos/${photosRandomUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(RangeLikes.MIN, RangeLikes.MAX),
  comments: Array.from({length: getRandomInteger(countOfComments.MIN, countOfComments.MAX)}, createComment)
});

const createPosts = () => Array.from({length: POST_COUNT}, createPost);
createPosts();

//const createdPosts = Array.from({length: POST_COUNT}, createPost);
//console.log(createdPosts);

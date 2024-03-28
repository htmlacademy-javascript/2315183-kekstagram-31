
const imageFilterBlock = document.querySelector('.img-filters');

const defaultFilterButton = imageFilterBlock.querySelector('#filter-default');
const randomFilterButton = imageFilterBlock.querySelector('#filter-random');
const discussedFilterButton = imageFilterBlock.querySelector('#filter-discussed');

const showImageFilterBlock = () => {
  imageFilterBlock.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  const exActiveButton = imageFilterBlock.querySelector('.img-filters__button--active');

  exActiveButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const getCountMiniatures = (items) => {
  const activeButton = imageFilterBlock.querySelector('.img-filters__button--active');
  let countMiniatures = items.length;

  if (activeButton.id === 'filter-random') {
    countMiniatures = 10;
  }

  return countMiniatures;
};

const sortByFilter = (elementA, elementB) => {
  const activeButton = imageFilterBlock.querySelector('.img-filters__button--active');

  const commentElementA = elementA.comments.length;
  const commentsElementB = elementB.comments.length;


  if (activeButton.id === 'filter-default') {
    return 0;
  }
  if (activeButton.id === 'filter-random') {
    return 0.5 - Math.random();
  }
  if (activeButton.id === 'filter-discussed') {
    if (commentElementA < commentsElementB) {
      return 0;
    }
    if (commentElementA < commentsElementB) {
      return 1;
    }
    return -1;
  }
};

const setDefaultFilter = (cb) => {
  defaultFilterButton.addEventListener('click', () => {
    setActiveButton(defaultFilterButton);
    cb();
  });
};

const setRandomFilter = (cb) => {
  randomFilterButton.addEventListener('click', () => {
    setActiveButton(randomFilterButton);
    cb();
  });
};

const setDiscussedFilter = (cb) => {
  discussedFilterButton.addEventListener('click', () => {
    setActiveButton(discussedFilterButton);
    cb();
  });
};


export { showImageFilterBlock, setDefaultFilter, setRandomFilter, setDiscussedFilter, sortByFilter, getCountMiniatures };

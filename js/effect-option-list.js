const effectOption = {
  none: {
    MIN: 0,
    MAX: 0,
    START: 0,
    STEP: 0,
    UNIT: '',
    FILTER_NAME: 'none'
  },
  chrome: {
    MIN: 0,
    MAX: 1,
    START: 0.5,
    STEP: 0.1,
    UNIT: '',
    FILTER_NAME: 'grayscale'
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    START: 0.5,
    STEP: 0.1,
    UNIT: '',
    FILTER_NAME: 'sepia'
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    START: 0,
    STEP: 1,
    UNIT: '%',
    FILTER_NAME: 'invert'
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    START: 0,
    STEP: 0.1,
    UNIT: 'px',
    FILTER_NAME: 'blur'
  },
  heat: {
    MIN: 0,
    MAX: 3,
    START: 1,
    STEP: 0.1,
    UNIT: '',
    FILTER_NAME: 'brightness'
  }
};

export { effectOption };

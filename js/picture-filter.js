import { effectOption } from './effect-option-list.js';

const DefaultSliderSetting = {
  MIN: 0,
  MAX: 100,
  START: 100
};

const DEFAULT_EFFECT_VALUE = 0;

const imagePreview = document.querySelector('.img-upload__preview img');

const sliderElement = document.querySelector('.effect-level__slider');
const sliderPanel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = effectOption.none;

const applyFilter = () => {
  if (currentEffect.FILTER_NAME === 'none') {
    imagePreview.style.filter = 'none';
  } else {
    imagePreview.style.filter = `${currentEffect.FILTER_NAME}(${effectLevelValue.value}${currentEffect.UNIT})`;
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DefaultSliderSetting.MIN,
      max: DefaultSliderSetting.MAX,
    },
    start: DefaultSliderSetting.START,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.setAttribute('disabled', true);
  sliderPanel.classList.add('hidden');

  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = sliderElement.noUiSlider.get();
    applyFilter();
  });
};

const editSlider = (minValue, maxValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue
    },
    start: maxValue,
    step: stepValue
  });
};

const hideSlider = (name) => {
  if (name === 'none') {
    sliderPanel.classList.add('hidden');
  } else {
    sliderPanel.classList.remove('hidden');
    sliderElement.removeAttribute('disabled');
  }
};

const changeImageEffect = (button) => {
  const effect = effectOption[button];
  currentEffect = effect;

  hideSlider(effect.FILTER_NAME);
  editSlider(effect.MIN, effect.MAX, effect.STEP);
};

const clearEffects = () => {
  effectLevelValue.value = DEFAULT_EFFECT_VALUE;
  imagePreview.style.filter = effectOption.none.FILTER_NAME;
};

export { changeImageEffect, sliderElement, clearEffects, createSlider };

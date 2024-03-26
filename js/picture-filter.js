import { effectOption } from './effect-option-list.js';

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
  imagePreview.style.transform = 'scale(1)';
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
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
  effectLevelValue.value = 0;
  imagePreview.style.filter = effectOption.none.FILTER_NAME;
};

const deleteSlider = () => {
  sliderElement.noUiSlider.destroy();
};

export { changeImageEffect, sliderElement, clearEffects, createSlider, deleteSlider };

const Scales = {
  START: 100,
  STEP: 25
};

const ChromeEffectValues = {
  MIN: 0,
  MAX: 1,
  START: 0.5,
  STEP: 0.1
};

const SepiaEffectValues = {
  MIN: 0,
  MAX: 1,
  START: 0.5,
  STEP: 0.1
};

const MarvinEffectValues = {
  MIN: 0,
  MAX: 100,
  START: 0,
  STEP: 1
};

const PhobosEffectValues = {
  MIN: 0,
  MAX: 3,
  START: 0,
  STEP: 0.1
};

const HeatEffectValues = {
  MIN: 0,
  MAX: 3,
  START: 1,
  STEP: 0.1
};

const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 50,
    connect: 'lower'
  });
  sliderElement.setAttribute('disabled', true);
};

let scale;

const doPictureSmaller = () => {
  scale = scaleValueInput.value.replace('%', '');
  if (scale > 25) {
    scale = scale - Scales.STEP;
    scaleValueInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
  }
};

const doPictureBigger = () => {
  scale = scaleValueInput.value.replace('%', '');
  if (scale < 100) {
    scale = Number(scale) + Scales.STEP;
    scaleValueInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
  }
};

const resetImageScale = () => {
  scaleValueInput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
};

const editSlider = (minValue, maxValue, startValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue
    },
    start: startValue,
    step: stepValue
  });
};

const changeImageEffect = (item) => {
  switch(item.id) {
    case 'effect-chrome':
      sliderElement.removeAttribute('disabled');
      editSlider(ChromeEffectValues.MIN, ChromeEffectValues.MAX, ChromeEffectValues.START, ChromeEffectValues.STEP);
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
      });
      break;
    case 'effect-sepia':
      sliderElement.removeAttribute('disabled');
      editSlider(SepiaEffectValues.MIN, SepiaEffectValues.MAX, SepiaEffectValues.START, SepiaEffectValues.STEP);
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
      });
      break;
    case 'effect-marvin':
      sliderElement.removeAttribute('disabled');
      editSlider(MarvinEffectValues.MIN, MarvinEffectValues.MAX, MarvinEffectValues.START, MarvinEffectValues.STEP);
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
      });
      break;
    case 'effect-phobos':
      sliderElement.removeAttribute('disabled');
      editSlider(PhobosEffectValues.MIN, PhobosEffectValues.MAX, PhobosEffectValues.START, PhobosEffectValues.STEP);
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
      });
      break;
    case 'effect-heat':
      sliderElement.removeAttribute('disabled');
      editSlider(HeatEffectValues.MIN, HeatEffectValues.MAX, HeatEffectValues.START, HeatEffectValues.STEP);
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `brightness(${sliderElement.noUiSlider.get()})`;
      });
      break;
    default:
      sliderElement.setAttribute('disabled', true);
      effectLevelValue.value = 0;
      imagePreview.style.filter = null;
  }
};

const clearEffects = () => {
  sliderElement.noUiSlider.destroy();
  effectLevelValue.value = 0;
  imagePreview.style.filter = null;
};

export { doPictureSmaller, doPictureBigger, resetImageScale, changeImageEffect, sliderElement, clearEffects, createSlider };

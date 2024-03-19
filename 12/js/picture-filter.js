const Scales = {
  START: 100,
  STEP: 25
};

const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  connect: 'lower'
});
sliderElement.setAttribute('disabled', true);

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

const changeImageEffect = (item) => {
  switch(item.id) {
    case 'effect-chrome':
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 0.5,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
      });
      break;
    case 'effect-sepia':
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 0.5,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
      });
      break;
    case 'effect-marvin':
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 50,
        step: 1
      });
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
      });
      break;
    case 'effect-phobos':
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 0,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        imagePreview.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
      });
      break;
    case 'effect-heat':
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 1,
        step: 0.1
      });
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

export { doPictureSmaller, doPictureBigger, resetImageScale, changeImageEffect, sliderElement };

const Scale = {
  START: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let scale;

const onPictureSmaller = () => {
  scale = scaleValueInput.value.replace('%', '');
  if (scale > Scale.MIN) {
    scale = scale - Scale.STEP;
    scaleValueInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
  }
};

const onPictureBigger = () => {
  scale = scaleValueInput.value.replace('%', '');
  if (scale < Scale.MAX) {
    scale = Number(scale) + Scale.STEP;
    scaleValueInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
  }
};

const resetImageScale = () => {
  scaleValueInput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
};

export { onPictureBigger, onPictureSmaller, resetImageScale };

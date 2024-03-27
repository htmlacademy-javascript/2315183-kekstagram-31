import { drawMiniatures } from './draw-miniatures.js';
import './picture-popup.js';
import './picture-form-popup.js';
import './form-validation.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setPostFormSubmit } from './form-validation.js';
import { closeLoadImageForm } from './picture-form-popup.js';


getData()
  .then((miniature) => {
    drawMiniatures(miniature);
  })
  .catch(() => {
    showAlert();
  });

setPostFormSubmit(closeLoadImageForm);


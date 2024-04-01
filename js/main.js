import { drawMiniatures } from './draw-miniatures.js';
import './picture-popup.js';
import './picture-form-popup.js';
import './form-validation.js';
import { getData } from './api.js';
import { debounce, showAlert } from './utils.js';
import { setPostFormSubmit } from './form-validation.js';
import { closeLoadImageForm } from './picture-form-popup.js';
import { setDefaultFilter, setDiscussedFilter, setRandomFilter, showImageFilterBlock } from './filter-miniature.js';
import { initValidation } from './form-validation.js';

const RERENDER_DELAY = 500;

//initValidation();

getData()
  .then((miniature) => {
    const doDebounce = debounce(() => drawMiniatures(miniature), RERENDER_DELAY);

    drawMiniatures(miniature);

    setDefaultFilter(doDebounce);
    setRandomFilter(doDebounce);
    setDiscussedFilter(doDebounce);
  })
  .then(() => {
    showImageFilterBlock();
  })
  .catch(() => {
    showAlert();
  });

setPostFormSubmit(closeLoadImageForm);


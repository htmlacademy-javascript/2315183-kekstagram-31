import { createPosts } from './create-post.js';
import { drawMiniatures } from './draw-miniatures.js';
import './picture-popup.js';
import './picture-form-popup.js';
import './form-validation.js';

const miniatures = createPosts();
drawMiniatures(miniatures);

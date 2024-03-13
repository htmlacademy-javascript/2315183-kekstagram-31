import { createPosts } from './create-post.js';
import { drawMiniatures } from './draw-miniatures.js';
import './picture-popup.js';

const miniatures = createPosts();
drawMiniatures(miniatures);

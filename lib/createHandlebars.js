import Handlebars from 'handlebars';
import { registerHelpers } from './registerHelpers.js';

function createHandlebars() {
  const handlebars = Handlebars;
  registerHelpers(handlebars);
  return handlebars;
}

export { createHandlebars };

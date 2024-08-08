import fs from 'node:fs';

import { createHandlebars } from './lib/createHandlebars.js';
import { parseOpenApi } from './lib/parseOpenApi.js';

import {
  getList,
} from './generators/index.js';

const handlebars = createHandlebars();
const spec = await parseOpenApi();

const tests = getList({ spec, handlebars });

if (!fs.existsSync('./codegen')) {
  fs.mkdirSync('./codegen');
}

fs.writeFileSync(
  './codegen/api.test.js',
  `import axios from 'axios';

${tests.join('\n\n')}
`);

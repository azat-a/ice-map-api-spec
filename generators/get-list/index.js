import fs from 'node:fs';

const baseUrl = 'https://api.udev.su/v1';

function getGetListEndpoints(spec) {
  const endpoints = [];
  Object.entries(spec.paths).forEach(([path, methods]) => {
    if (methods?.parameters) return;

    Object.entries(methods).forEach(([method, operation]) => {
      if (method !== 'get') return;

      endpoints.push({
        url: `${baseUrl}${path}`,
        method,
        type: operation['responses']['200']['content']['application/json']['schema']['type'],
      })
    })
  })

  return endpoints;
}

function getTemplate() {
  return fs.readFileSync('./generators/get-list/template.handlebars', { encoding: 'utf-8' });
}

function getList({ spec, handlebars }) {
  const endpoints = getGetListEndpoints(spec);
  const template = getTemplate();
  const generateTest = handlebars.compile(template);

  return endpoints.map(({ url, method, type }) => generateTest({ url, method, type }));
}

export {
  getList,
};

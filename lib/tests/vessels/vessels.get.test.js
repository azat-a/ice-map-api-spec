const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const VESSELS_URL = `${BASE_URL}/vessels`;

test(`GET ${VESSELS_URL} должен возвращать array`, async () => {
  const response = await axios.get(VESSELS_URL);
  expect(response.status).toBe(200);
  expect(response.data).toEqual(expect.any(Array));
});

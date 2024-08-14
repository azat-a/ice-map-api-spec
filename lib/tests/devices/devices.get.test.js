const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const DEVICES_URL = `${BASE_URL}/devices`;

test(`GET ${DEVICES_URL} должен возвращать array`, async () => {
  const response = await axios.get(DEVICES_URL);
  expect(response.status).toBe(200);
  expect(response.data).toEqual(expect.any(Array));
});

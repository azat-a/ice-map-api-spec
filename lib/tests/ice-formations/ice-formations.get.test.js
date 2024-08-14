const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const ICE_FORMATIONS_URL = `${BASE_URL}/ice-formations`;

test(`GET ${ICE_FORMATIONS_URL} должен возвращать array`, async () => {
  const response = await axios.get(ICE_FORMATIONS_URL);
  expect(response.status).toBe(200);
  expect(response.data).toEqual(expect.any(Array));
});

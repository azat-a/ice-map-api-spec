const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const NOTIFICATIONS_URL = `${BASE_URL}/notifications`;

test(`GET ${NOTIFICATIONS_URL} должен возвращать array`, async () => {
  const response = await axios.get(NOTIFICATIONS_URL);
  expect(response.status).toBe(200);
  expect(response.data).toEqual(expect.any(Array));
});

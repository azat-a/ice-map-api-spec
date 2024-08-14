const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const DEVICES_URL = `${BASE_URL}/devices`;

test(`GET ${DEVICES_URL}/id должен возвращать объект с тем же id, что и у созданного устройства`, async () => {
  const body = { type: 'apard', status: 'available' };
  
  // Создаем устройство и получаем его ID
  const createdDeviceId = await createDevice(body);
  
  // Делаем запрос по этому ID
  const response = await axios.get(`${DEVICES_URL}/${createdDeviceId}`);
  
  // Проверяем, что статус ответа 200
  expect(response.status).toBe(200);
  
  // Проверяем, что ID объекта в ответе совпадает с ID созданного устройства
  expect(response.data.id).toBe(createdDeviceId);
});

async function createDevice(body) {
  try {
    const createdDevice = await axios.post(DEVICES_URL, body);

    const createdDeviceId = createdDevice.data.id;
    expect(createdDeviceId).toBeDefined();
    expect(typeof createdDeviceId).toBe('string');

    return createdDeviceId;
  } catch (error) {
    throw new Error('Создание устройства завершилось с ошибкой или не вернуло ожидаемый ответ');
  }
}



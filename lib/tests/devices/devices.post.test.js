const axios = require('axios');

const BASE_URL = 'http://api.udev.su/v1';
const DEVICES_URL = `${BASE_URL}/devices`;

describe('Тесты на создание нового устройства', () => {
    const successfulTestCases = [
      {
        body: { type: 'apard', status: 'avaliable' }
      },
      {
        body: { type: 'arme', status: 'unavaliable' }
      },
      {
        body: { type: 'apard', status: 'activation' }
      },
      {
        body: { type: 'arme', status: 'writed-off' }
      },
      {
        body: { type: 'apard', status: 'active', activationStatus: 'start' }
      },
      {
        body: { type: 'arme', status: 'active', activationStatus: 'test' }
      },
      {
        body: { type: 'apard', status: 'active', activationStatus: 'test-1' }
      },
      {
        body: { type: 'arme', status: 'active', activationStatus: 'test-2' }
      },
      {
        body: { type: 'apard', status: 'active', activationStatus: 'test-ok' }
      },
      {
        body: { type: 'arme', status: 'active', activationStatus: 'bind-start' }
      },
      {
        body: { type: 'apard', status: 'active', activationStatus: 'bind' }
      }
    ];

    successfulTestCases.forEach(({ body }) => {
      test(`Создание устройства с параметрами ${JSON.stringify(body)} должно возвращать 200 OK`, async () => {
        const response = await axios.post(DEVICES_URL, body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(false);
        expect(response.data.type).toBe(body.type);
        expect(response.data.status).toBe(body.status);
        if (body.status === 'active') {
          expect(response.data.activationStatus).toBe(body.activationStatus);
        } else {
          expect(response.data.activationStatus).toBeNull();
        }
      });
    });

  const unsuccessfulTestCases = [
    {
      description: 'без поля type',
      body: { status: 'avaliable' }
    },
    {
      description: 'без поля status',
      body: { type: 'apard' }
    },
    {
      description: 'без поля type и status',
      body: {}
    },
    {
      description: 'с неправильным значением type',
      body: { type: 'wrongType', status: 'avaliable' }
    },
    {
      description: 'с неправильным значением status',
      body: { type: 'apard', status: 'wrongStatus' }
    }
  ];

  unsuccessfulTestCases.forEach(({ description, body }) => {
    test(`Создание устройства ${description} должно возвращать ошибку`, async () => {
      try {
        await axios.post(DEVICES_URL, body);
        throw new Error('Запрос завершился успешно, но ожидалась ошибка');
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });
  });
});

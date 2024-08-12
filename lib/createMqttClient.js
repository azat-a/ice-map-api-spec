import mqtt from 'mqtt';

function createMqttClient({ url, username, password }) {
  // Подключение к MQTT-брокеру с использованием логина и пароля
  const client = mqtt.connect(url, {
    username,
    password,
  });

  // Подписка на топик
  client.on('connect', () => {
    console.log('Connected to broker');
    client.subscribe("devices/#", (err) => err && console.log('Subscribed to devices'));
    client.subscribe("system/map", (err) => err && console.log('Subscribed to system/map'));
  });

  // Обработка входящих сообщений
  client.on('message', (topic, message) => {
    // message - это Buffer
    console.log(`Received message on ${topic}: ${message.toString()}`);
  });
}

export {
  createMqttClient,
};

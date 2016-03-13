const https   = require('https');
const host    = 'api.telegram.org';
const token   = '188448037:AAEwnjvVR33NVBdH1QBDSl2wjrDKzMTWSQM';
const request = '/sendMessage';

module.exports = function sendMessage(message) {
  console.log('--- Enviando respuesta');

  const reqOptions = {
    hostname: host,
    port: 443,
    path: `'/bot${token}${request}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(message).length,
    },
  };

  https.request(reqOptions, () => {
    console.log('--- Respuesta enviada');
  }).write(JSON.stringify(message), 'utf8');
};

'use strict';

const https   = require('https');
const host    = 'api.telegram.org';
const token   = `${process.env.TELEGRAM_KEY}:${process.env.TELEGRAM_SECRET}`;
const request = '/sendMessage';

module.exports = function sendMessage(message) {
  console.log('--- Enviando respuesta');
  console.log(`/bot${token}${request}`);

  const reqOptions = {
    hostname: host,
    port: 443,
    path: `/bot${token}${request}`,
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

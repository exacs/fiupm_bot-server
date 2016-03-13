'use strict';

const test = require('tape');
const bus  = require('../modules/bus.js');

test('Bus Module testing', { timeout: 10000 }, t => {
  const msg = {
    chat: {
      id: 0,
    },
  };

  bus(msg).then(() => {
    t.end();
  }).catch(err => {
    t.end(err);
  });
});

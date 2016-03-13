'use strict';

const test  = require('tape');
const hello = require('../modules/hello.js');

test('Hello Module testing', t => {
  const msg = {
    chat: {
      id: 0,
    },
  };

  hello(msg).then(res => {
    t.equal(res, 'Good morning', 'It should say "Good morning"');
    t.end();
  }).catch(() => {
    t.fail('not good');
    t.end();
  });
});

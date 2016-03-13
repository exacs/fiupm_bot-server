'use strict';

module.exports = function hello() {
  return new Promise((accept /* , reject*/) => {
    accept('Good morning');
  });
};

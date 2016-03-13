'use strict';

/**
 * Comprueba el tiempo restante de los buses más cercanos a la FI
 */
const request = require('request');

function convertWaitTime(time) {
  if (time === '<<<<') {
    return 0;
  } else if (time.indexOf(':') !== -1) {
    return 1000;
  } else {
    return parseInt(time, 10);
  }
}

function toStr(arr, lines) {
  return arr.filter(
    bus => lines.some(t => t === bus.line)
  ).map(
    bus => `Línea ${bus.line} - en ${bus.time} minutos`
  ).join('\n');
}


module.exports = function bus() {
  return new Promise((accept, reject) => {
    let count = 0;
    const result = [];

    const dir1 = 'http://api.interurbanos.welbits.com/v1/stop/08771'; // 571,573
    const dir2 = 'http://api.interurbanos.welbits.com/v1/stop/08411'; // 591
    const dir3 = 'http://api.interurbanos.welbits.com/v1/stop/17573'; // 865


    [dir1, dir2, dir3].forEach((dir, i) => {
      request(dir, (error, response, body) => {
        if (error || parseInt(response.statusCode, 10) !== 200) {
          reject(`Error ${response.statusCode}`);
        }


        const data = JSON.parse(body).lines.map(
          b => ({ line: b.lineNumber, time: convertWaitTime(b.waitTime) })
        ).filter(
          b => b.time < 1000
        );
        result[i] = data;
        count++;

        if (count === 3) {
          console.log('- Recibidas las 3 respuestas GET');

          const all = result.reduce(
            (a, b) => a.concat(b)
          ).sort(
            (a, b) => a.time - b.time
          );

          let str = '';
          str += '*Colonia Jardín*\n';
          str += `${toStr(all, ['571', '573', '591'])}\n\n`;

          str += '*Aluche*\n';
          str += `${toStr(all, ['571', '591'])}\n\n`;

          str += '*Moncloa / C.Universitaria*\n';
          str += `${toStr(all, ['573', '865'])}\n\n`;
          accept(str);
        }
      });
    });
  });
};

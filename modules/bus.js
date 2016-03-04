'use strict';

/**
 * Comprueba el tiempo restante de los buses más cercanos a la FI
 */
const request = require('request');

function convertWaitTime(time) {
  if (time==='<<<<')
    return 0;
  else if (time.indexOf(':')!==-1)
    return 1000;
  else
    return parseInt(time, 10);
}

function getOne(dir, i) {
  request(dir, function(error, response, body) {
    result[i] = JSON.parse(body).lines
      .map(
        bus => ({
          line: bus.lineNumber,
          time: convertWaitTime(bus.waitTime)
        })
      )
      .filter(
        bus => bus.time<1000
      );
    count++;

    if (count===3) {
      result.map()
    }
  });
}

function toStr(arr, lines) {
  return arr.filter(
    bus => lines.some(t => t===bus.line)
  )
  .map(
    bus => `Línea ${bus.line} - en ${bus.time} minutos`
  )
  .join('\n')
}


module.exports = function(msg) {return new Promise(function(accept, reject) {
  let count = 0;
  let result = [];

  const dir1 = 'http://api.interurbanos.welbits.com/v1/stop/08771'; // 571,573
  const dir2 = 'http://api.interurbanos.welbits.com/v1/stop/08411'; // 591
  const dir3 = 'http://api.interurbanos.welbits.com/v1/stop/17573'; // 865


  [dir1, dir2, dir3].forEach(function(dir, i) {
    console.log(dir);
    request(dir, function(error, response, body) {
      console.log(dir);
      const data = JSON.parse(body).lines.map(
        bus => ({
          line: bus.lineNumber,
          time: convertWaitTime(bus.waitTime)
        })
      ).filter(bus => bus.time<1000);
      result[i] = data;
      count++;

      if (count===3) {
        console.log('lllegamos a 3!!!');
        const all = result.reduce((a,b) => a.concat(b)).sort((a,b) => a.time - b.time);
        let str = '';
        str += '*Colonia Jardín*\n';
        str += toStr(all, ['571', '573', '591']) + '\n\n';

        str += '*Aluche*\n';
        str += toStr(all, ['571', '591']) + '\n\n';

        str += '*Moncloa / C.Universitaria*\n';
        str += toStr(all, ['573', '865']) + '\n\n';
        accept({
          chat_id: msg.chat.id,
          text:str,
          options: {
            parse_mode:'Markdown'
          }
        });
      }
    });
  });})
}



/*
.then(function(data) {
  const all = data.reduce((a,b) => a.concat(b)).sort((a,b) => a.time - b.time);

  console.log('---- Colonia Jardín ----')
  console.log(all.filter(bus => bus.line==='571' || bus.line==='573' || bus.line==='591').map(bus => `Línea ${bus.line} - en ${bus.time} minutos`));
  console.log('');
  console.log('---- Aluche ----')
  console.log(all.filter(bus => bus.line==='571' || bus.line==='591'));
  console.log('');
  console.log('---- Moncloa / C.Universitaria ----')
  console.log(all.filter(bus => bus.line==='865' || bus.line==='573'));

});
*/
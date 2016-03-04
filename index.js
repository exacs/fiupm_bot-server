const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const host    = 'api.telegram.org';
const token   = '188448037:AAEwnjvVR33NVBdH1QBDSl2wjrDKzMTWSQM';
const request = '/sendMessage';

const app = express();
const options = {
  'hello' : require('./modules/hello.js'),
  'bus' : require('./modules/bus.js')
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));

app.post('/', function(req, res) {
  console.log(req.body.message);
  // Send an OK
  res.status(200).end();

  // Send the reply
  options.bus(req.body.message)
    .then((message) => {
      console.log(message);
      const reqOptions = {
        hostname: host,
        port: 443,
        path: '/bot' + token + request,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(message).length
        }
      }
      https.request(reqOptions, function(res) {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.')
        })
      }).write(JSON.stringify(message), encoded='utf8');
    });
});

app.listen(app.get('port'), function() {
  console.log('Listening to port ', app.get('port'));
});

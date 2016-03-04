const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const host    = 'api.telegram.org';
const token   = '188448037:AAEwnjvVR33NVBdH1QBDSl2wjrDKzMTWSQM';
const request = '/sendMessage';

const app = express();
const options = {
  'hello' : require('./modules/hello.js')
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res) {
  console.log(req.body.message);
  // Send an OK
  res.status(200).end();

  // Send the reply
  const message = options.hello(req.body.message);

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

  https.request(reqOptions, function(res2) {

  }).write(JSON.stringify(message), encoded='utf8');
});

app.listen(80, function() {
  console.log('Listening to port 80');
});

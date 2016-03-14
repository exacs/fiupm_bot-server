'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const router      = require('./core/router.js');
const sendMessage = require('./core/sendMessage.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => {
  console.log(
    `Mensaje proveniente de chat=${req.body.message.chat.id}` +
    ` \t @${req.body.message.from.username}`
  );

  // Send an OK
  res.status(200).end();

  // Send the reply
  router(req.body.message).then(sendMessage);
});

app.listen(app.get('port'), () => {
  console.log('Listening to port ', app.get('port'));
});

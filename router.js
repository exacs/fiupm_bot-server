'use strict';

const commandList = [
  {c: ['bus'],    a: require('./modules/bus.js')}
];

/**
 * Executes the action indicated in the message
 */
module.exports = function(message) {
  // If it does not start from "/", ignore
  if (message.text.indexOf('/')!==0) {
    console.log('- Non-command received: ', message.text);
    return new Promise(function() {});
  }

  let args = message.text.slice(1).split(' ');
  const command = args[0];
  const filtered = commandList.filter(cmd => cmd.c.indexOf(command)!==-1);

  if (filtered.length===1) {
    console.log('- Command: ', command);

    return new Promise(function(accept, reject) {
      filtered[0].a(...args.slice(1))
        .then(
          text => accept({
            chat_id: message.chat.id,
            text,
            options: {
              parse_mode:'Markdown'
            }
          })
        );
    });
  } else {
    console.log('- Unknown command: ', command);
    return new Promise(function() {});
  }
}

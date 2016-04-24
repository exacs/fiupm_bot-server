/**
 * Executes the action indicated in a message.
 *
 * Call once to set up the commandList, an array of Command objects.
 * Call it again to perform a request
 *
 * This function checks that the request is a command and that there is a
 * named as the request
 */
module.exports = commandList => request => new Promise((accept, reject) => {
  // Error handling
  if (request.indexOf('/') !== 0) {
    reject(new Error('Request must start with a slash'));
  }

  const args = request.split(' ');
  const filteredCommand = commandList.filter(
    command => command.names.filter(
      name => name === args[0]
    ).length > 0
  );

  if (filteredCommand.length === 0) {
    reject(new Error('Command not found'));
  }
  if (filteredCommand.length > 1) {
    reject(new Error('More than one command found'));
  }

  // All ok. Execute command
  new Promise(
    filteredCommand[0].action(...args.splice(1))
  ).then(
    response => {accept(response);}
  ).catch(
    error => {reject(error);}
  );
});


module.exports = function(msg) {
  return new Promise(function(accept, reject) {
    accept({
      chat_id:msg.chat.id,
      text:'Good morning',
      options: {
        parse_mode:'Markdown'
      }
    });
  });
}
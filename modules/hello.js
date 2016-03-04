module.exports = function(msg) {
  return ({
    chat_id:msg.chat.id,
    text:'Good morning',
    parse_mode:'Markdown'
  });
}
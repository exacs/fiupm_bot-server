module.exports = function hello(msg) {
  return new Promise((accept /* , reject*/) => {
    accept({
      chat_id: msg.chat.id,
      text: 'Good morning',
      options: {
        parse_mode: 'Markdown',
      },
    });
  });
};

const normalizeMessages = (chat) => {
  const { normalize } = require("normalizr");
  const schema = require("../../schemas/normalizr/message");
  return chat.messages.length > 0 ? normalize(chat, schema) : chat;
};

module.exports = normalizeMessages;

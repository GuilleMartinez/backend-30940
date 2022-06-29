const normalizeMessages = (chat) => {
  const { normalize } = require("normalizr");
  const schema = require("../schemas/messages");
  const normalized = chat.messages.length > 0 ? normalize(chat, schema) : chat;
  return normalized;
};

module.exports = normalizeMessages;

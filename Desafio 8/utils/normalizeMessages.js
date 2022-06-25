const normalizeMessages = (chat) => {
  const { normalize } = require("normalizr");
  const schema = require("../schemas/messages");
  const normalizedChat = chat.messages.length > 0 ? normalize(chat, schema) : chat;

  return normalizedChat;
};

module.exports = normalizeMessages;

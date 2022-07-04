const { schema } = require("normalizr");

const author = new schema.Entity("authors", {}, { idAttribute: "email" });
const message = new schema.Entity("messages", { author }, { idAttribute: "_id" });
const messages = new schema.Entity("chat", { messages: [message] });

module.exports = messages;

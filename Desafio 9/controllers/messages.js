const messages = require("../models/messages");

const addMessage = async (req, res) => {
  const { user: { email, name, avatar } } = req.session;
  const { timestamp, content } = req.body;
  const message = {
    timestamp,
    author: { email, name, avatar },
    content,
  }
  return res.json({ added: await messages.insertOne(message) });
};

module.exports = { addMessage };

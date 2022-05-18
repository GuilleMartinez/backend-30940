const messages = require("../models/messages");

const addMessage = async (req, res) => {
  const message = await messages.insertOne(req.body);
  return res.json({ added: message });
};

module.exports = { addMessage };

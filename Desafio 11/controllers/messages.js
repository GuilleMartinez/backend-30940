const messages = require("../models/messages");

const addMessage = async (req, res, next) => {
  const { user: { _id } } = req;
  const { content } = req.body;
  const { added } = await messages.insertOne({ author: _id, content });
  return added ? res.status(201).json({ added }) : res.sendStatus(500);
};

module.exports = { addMessage };

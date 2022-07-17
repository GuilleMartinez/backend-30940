const messages = require("../models/messages");

const addMessage = async (req, res, next) => {
  const { user: { _id } } = req;
  const { content } = req.body;
  const { added, error } = await messages.insertOne({ author: _id, content });
  return error ? next({ type: "server_error", error }) : res.status(201).json({ added });
};

module.exports = { addMessage };

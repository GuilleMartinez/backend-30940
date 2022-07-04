const { model } = require("mongoose");
const { mongo: { messagesCollection } } = require("../config/options");
const schema = require("../schemas/mongodb/message");
const Database = require("../lib/MongoDatabase");

module.exports = new Database(model("messages", schema, messagesCollection));
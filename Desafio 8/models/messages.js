const { sql: { config, messagesTable } } = require("../config/options");

const model = (table) => {
  table.increments("id").primary();
  table.timestamp("timestamp");
  table.json("author");
  table.string("content");
};

const SQLMessages = require("../lib/SQLMessages");

module.exports = new SQLMessages(config, messagesTable, model);

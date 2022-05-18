const { messages: { config, table } } = require("../config/options");

const model = (table) => {
  table.increments("id").primary();
  table.string("author");
  table.string("content");
  table.timestamp("timestamp");
};

const SQLDatabase = require("../lib/SQLDatabase");

module.exports = new SQLDatabase(config, table, model);

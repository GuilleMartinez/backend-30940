const { products: { config, table } } = require("../config/options");

const model = (table) => {
  table.increments("id").primary();
  table.string("title");
  table.float("price");
  table.string("thumbnail");
};

const SQLDatabase = require("../lib/SQLDatabase");

module.exports = new SQLDatabase(config, table, model);

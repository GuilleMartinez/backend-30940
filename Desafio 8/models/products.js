const { products: { config, table } } = require("../config/options");

const model = (table) => {
  table.increments("id").primary();
  table.string("title");
  table.float("price");
  table.string("thumbnail");
};

const SQLProducts = require("../lib/SQLProducts");

module.exports = new SQLProducts(config, table, model);

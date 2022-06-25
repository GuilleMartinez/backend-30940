const SQLDatabase = require("./SQLDatabase");

class SQLProducts extends SQLDatabase {
    constructor(config, table, model) {
        super(config, table, model);
    }
}

module.exports = SQLProducts;
class SQLDatabase {
  constructor(config, table, model) {
    this.database = require("knex")(config);
    this.table = table;
    this.model = model;
    this.initialize();
  }

  async initialize() {
    const exists = await this.database.schema.hasTable(this.table);
    if (!exists) {
      return await this.database.schema.createTable(this.table, this.model);
    }
  }

  async get() {
    return await this.database(this.table).select();
  }

  async insertOne(data) {
    const [id] = await this.database(this.table).insert(data);
    return await this.findOne(id);
  }

  async findOne(id) {
    const [item] = await this.database(this.table).where({ id }).select();
    return item || null;
  }

  async updateOne(id, atributes) {
    return await this.database(this.table).where({ id }).update(atributes);
  }

  async removeOne(id) {
    return await this.database(this.table).where({ id }).del();
  }
}

module.exports = SQLDatabase;

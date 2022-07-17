const Database = require("./Database");

class MongoDatabase extends Database {
  constructor(model) {
    super();
    this.model = model;
  }

  async get() {
    return await this.model.find({}).lean(true).exec();
  }

  async findOne(id) {
    try {
      const finded = await this.model.findById(id);
      return { finded, error: null };
    } catch (error) {
      return { finded: null, error };
    }
  }

  async insertOne(attributes) {
    try {
      const added = await this.model.create(attributes);
      return { added, error: null };
    } catch (error) {
      return { added: null, error };
    }
  }

  async removeOne(id) {
    try {
      const deleted = await this.model.findByIdAndRemove(id);
      return { deleted, error: null };
    } catch (error) {
      return { deleted: null, error };
    }
  }

  async updateOne(id, attributes) {
    try {
      const updated = await this.model.findByIdAndUpdate(id, attributes);
      return { updated, error: null };
    } catch (error) {
      return { updated: null, error };
    }
  }
}

module.exports = MongoDatabase;

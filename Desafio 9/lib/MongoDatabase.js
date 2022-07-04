const Database = require("./Database");

class MongoDatabase extends Database {
  constructor(model) {
    super();
    this.model = model;
  }

  async get() {
    return await this.model.find({}).lean();
  }

  async findOne(id) {
    try {
      const finded = await this.model.findById(id);
      return finded;
    } catch {
      return null;
    }
  }

  async insertOne(attributes) {
    const added = await this.model.create(attributes);
    return added;
  }

  async removeOne(id) {
    try {
      const deleted = await this.model.findByIdAndRemove(id);
      return deleted;
    } catch {
      return null;
    }
  }

  async updateOne(id, attributes) {
    try {
      const updated = await this.model.findByIdAndUpdate(id, attributes);
      return updated;
    } catch {
      return null;
    }
  }
}

module.exports = MongoDatabase;

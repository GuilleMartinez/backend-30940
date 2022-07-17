const MongoDatabase = require("./MongoDatabase");

class MongoUsers extends MongoDatabase {
    constructor(model) {
        super(model);
    }

    async filter(attributes = {}) {
        try {
            const user = await this.model.findOne(attributes).lean(true).exec();
            return { user, error: null };
        } catch (error) {
            return { user: null, error };
        }
    }
}

module.exports = MongoUsers;

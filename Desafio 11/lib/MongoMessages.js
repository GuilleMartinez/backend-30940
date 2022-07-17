const MongoDatabase = require("./MongoDatabase");

class MongoMessages extends MongoDatabase {
    constructor(model) {
        super(model);
        this.users = require("../models/users");
    }

    async get() {
        const messages = await this.model
            .find({})
            .lean(true)
            .populate("author", "email name avatar")
            .exec();
        return messages;
    }

    async findOne(id) {
        try {
            const finded = await this.model
                .findOne({ _id: id })
                .lean(true)
                .populate("author", "email name avatar")
                .exec();
            return { finded, error: null };
        } catch (error) {
            return { finded: null, error: error.message };
        }
    }

    async insertOne(attributes) {
        try {
            const { _id } = await this.model.create(attributes);
            const { finded: added, error } = await this.findOne(_id);
            if (error) throw new Error(error.message);
            else return { added, error: null };
        } catch (error) {
            return { added: null, error: error.message };
        }
    }
}

module.exports = MongoMessages;

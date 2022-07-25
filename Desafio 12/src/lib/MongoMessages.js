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
            return { finded };
        } catch {
            return { finded: null };
        }
    }

    async insertOne(attributes) {
        try {
            const { _id } = await this.model.create(attributes);
            const { finded } = await this.findOne(_id);
            return { added: finded };
        } catch {
            return { added: null };
        }
    }
}

module.exports = MongoMessages;

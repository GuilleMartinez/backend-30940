const { Schema } = require("mongoose");

const message = new Schema(
    {
        timestamp: { type: Date },
        author: {
            email: { type: String },
            name: { type: String },
            avatar: { type: String },
        },
        content: { type: String },
    },
    { versionKey: false }
);

module.exports = message;

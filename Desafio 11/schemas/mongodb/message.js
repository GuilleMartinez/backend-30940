const { Schema } = require("mongoose");

const message = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "users" },
        content: { type: String },
    },
    { versionKey: false, timestamps: { createdAt: 'timestamp' } }
);

module.exports = message;

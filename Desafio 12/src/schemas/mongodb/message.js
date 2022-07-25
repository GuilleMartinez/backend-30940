const { Schema } = require("mongoose");

const message = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "users", required: true },
        content: { type: String, required: true },
    },
    { versionKey: false, timestamps: { createdAt: 'timestamp' } }
);

module.exports = message;

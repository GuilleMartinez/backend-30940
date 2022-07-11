const { Schema } = require("mongoose");

const user = new Schema(
    {
        email: { type: String },
        password: { type: String },
        name: { type: String },
        avatar: { type: String },
    },
    { versionKey: false }
);

module.exports = user;

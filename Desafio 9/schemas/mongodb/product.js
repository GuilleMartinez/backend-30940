const { Schema } = require("mongoose");

const product = new Schema(
    {
        title: { type: String },
        price: { type: Number },
        thumbnail: { type: String }
    },
    { versionKey: false }
);

module.exports = product;

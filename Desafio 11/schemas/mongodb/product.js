const { Schema } = require("mongoose");

const product = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true }
    },
    { versionKey: false }
);

module.exports = product;

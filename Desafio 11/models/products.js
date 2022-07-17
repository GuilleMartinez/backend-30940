const { model } = require("mongoose");
const { mongo: { productsCollection } } = require("../config/options");
const schema = require("../schemas/mongodb/product");
const Database = require("../lib/MongoDatabase");

module.exports = new Database(model("products", schema, productsCollection));
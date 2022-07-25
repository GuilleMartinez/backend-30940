const { model } = require("mongoose");
const { mongo: { usersCollecion } } = require("../config/options");
const schema = require("../schemas/mongodb/user");
const Database = require("../lib/MongoUsers");

module.exports = new Database(model("users", schema, usersCollecion));
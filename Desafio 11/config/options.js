require("dotenv").config();

const yargs = require("yargs");
const inputs = process.argv.slice(2);
const { argv } = yargs(inputs).alias({ p: "port" }).default({ port: 8080 });

module.exports = {
  inputs,
  port: argv.port,
  mongo: {
    uri: process.env.MONGO_URI,
    productsCollection: "products",
    messagesCollection: "messages",
    usersCollecion: "users",
    sessionCollection: "sessions",
  },
};

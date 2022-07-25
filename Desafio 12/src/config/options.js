require("dotenv").config();

const yargs = require("yargs");
const inputs = process.argv.slice(2);

const { argv } = yargs(inputs)
  .alias({ p: "port", m: "mode" })
  .default({ port: 8080, mode: "fork" });

const cpus = require("node:os").cpus().length;

module.exports = {
  app: {
    port: argv.port,
    mode: argv.mode.toLowerCase(),
    cpus,
    inputs,
  },
  mongo: {
    uri: process.env.MONGO_URI,
    productsCollection: "products",
    messagesCollection: "messages",
    usersCollecion: "users",
    sessionCollection: "sessions",
  },
};

"use strict";

const express = require("express");
const { createServer } = require("http");
const { port, mongo: { uri } } = require("./config/options");
const shutdownServer = require("./utils/handlers/shutdownServer");

const app = express();
const httpServer = createServer(app);

// Default configurations
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Template Engine
require("./utils/configurations/configureViewEngine")(app);

// Configure websockets
require("./utils/configurations/configureWebsocket")(httpServer, app);

// Connect MongoDB
const { connect, connection } = require("mongoose");

connect(uri);

connection.once("connected", () => {
  // Configure Session
  const client = connection.getClient();
  require("./utils/configurations/configureSession")(client, app);

  // Configure Passport
  const passport = require("./utils/configurations/configurePassport")(app);

  // Configure Routes
  require("./routes/app")(passport, app);
  require("./routes/products")(app);
  require("./routes/messages")(app);
  require("./routes/test")(app);



  // Launch Server
  httpServer.listen(port, () => console.log(`Server listening on port: ${port} 👍`));

});

connection.on("error", shutdownServer);

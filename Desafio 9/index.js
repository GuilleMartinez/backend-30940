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
const mongoose = require("mongoose");

mongoose.connect(uri);
mongoose.connection.once("connected", () => {

  // Configure Session
  const client = mongoose.connection.getClient();
  const session = require("./utils/configurations/configureSession")(client);
  app.use(session);

  // Configure Routes
  app.use("/", require("./routes/app"));
  app.use("/products", require("./routes/products"));
  app.use("/messages", require("./routes/messages"));
  app.use(require("./utils/handlers/errorHanlder"));

  // Launch Server
  httpServer.listen(port, (error) => error ? shutdownServer(error) : console.log("Server ready!"));

});

mongoose.connection.on("error", shutdownServer);

"use strict";

const express = require("express");
const { port } = require("./config/options");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);

// Default configurations
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template Engine
require("./utils/configureViewEngine")(app);

// Web socket
require("./utils/configureWebsocket")(httpServer, app);

// Routers
app.use("/products", require("./routes/products"));
app.use("/messages", require("./routes/messages"));
app.use(require("./utils/errorHanlder"));

// Default Route
app.get("/", (req, res) => res.render("index_view", { pageTitle: "Home" }));

httpServer.listen(port, (err) =>
  err ? console.log(err) : console.log(`Server listening on port ${port} ✔`)
);

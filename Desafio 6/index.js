"use strict";

const express = require("express");
const { PORT } = require("./config/config");
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
app.use("/productos", require("./routes/products"));
app.use("/mensajes", require("./routes/messages"));

// Default Page
app.get("/", (req, res) => res.render("index_view", { pageTitle: "Home" }));

httpServer.listen(PORT, (err) =>
    err ? console.log(err) : console.log(`Server listening on port ${PORT}.`)
);

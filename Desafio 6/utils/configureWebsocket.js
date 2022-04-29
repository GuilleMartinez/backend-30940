module.exports = (httpServer, app) => {
    const { Server } = require("socket.io");
    const messagesDB = require("../models/messages");
    const products = require("../db/products");

    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log(`User connected ${socket.id}.`);

        const messages = await messagesDB.get();
        socket.emit("socket-connected", { products, messages });

        socket.on("product-added", (product) => {
            socket.broadcast.emit("new-product", product);
        });

        socket.on("message-added", (message) => {
            socket.broadcast.emit("new-message", message);
        });
    });

    app.set("socketio", io);
};

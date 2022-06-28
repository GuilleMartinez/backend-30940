module.exports = (httpServer, app) => {

    const { Server } = require("socket.io");

    const productsDB = require("../models/products");
    const messagesDB = require("../models/messages");
    const normalizeMessages = require("../utils/normalizeMessages");

    const io = new Server(httpServer);

    io.on("connection", async (socket) => {

        console.log(`User connected ${socket.id}.`);

        const messages = await messagesDB.get();
        const products = await productsDB.get();

        socket.emit("socket-connected", { products, messages: normalizeMessages(messages) });

        socket.on("product-added", (product) => {
            socket.broadcast.emit("new-product", product);
        });

        socket.on("message-added", (message) => {
            socket.broadcast.emit("new-message", message);
        });
    });

    app.set("socketio", io);
};

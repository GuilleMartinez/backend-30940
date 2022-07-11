module.exports = (httpServer, app) => {

    const { Server } = require("socket.io");
    const productsDb = require("../../models/products");
    const messagesDb = require("../../models/messages");
    const normalizeMessages = require("../messages/normalizeMessages");

    const io = new Server(httpServer);

    io.on("connection", async (socket) => {

        console.log(`User connected ${socket.id}.`);
        const products = await productsDb.get();
        const chat = { id: 1, messages: await messagesDb.get() };

        socket.emit("socket-connected", { products, messages: normalizeMessages(chat) });

        socket.on("product-added", (product) => {
            socket.broadcast.emit("new-product", product);
        });

        socket.on("message-added", (message) => {
            socket.broadcast.emit("new-message", message);
        });

    });

    app.set("socketio", io);
};

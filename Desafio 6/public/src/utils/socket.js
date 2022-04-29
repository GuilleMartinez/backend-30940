const socket = io();

import {
    renderProducts,
    renderOneProduct,
    renderMessages,
    renderOneMessage,
    showModal,
} from "./render.js";

socket.on("socket-connected", async ({ products, messages }) => {
    await renderProducts(products);
    await renderMessages(messages);
});

socket.on("new-product", async (product) => {
    await renderOneProduct(product);
    showModal("New product added", product.title, "products-section");
});

socket.on("new-message", async (message) => {
    await renderOneMessage(message);
    showModal("New message", message.message, "messages-section");
});

export default socket;

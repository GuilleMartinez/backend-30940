import denormalizeMessage from "./denormalize-messages.js";

const getHandlebarFile = async (file) => {
    const content = await fetch("../views/partials/" + file + ".hbs");
    return await content.text();
};

const registerPartial = async (partial) => {
    const content = await getHandlebarFile(partial);
    return Handlebars.registerPartial(partial, content);
};

const renderProducts = async (products) => {
    const handlebars = await getHandlebarFile("products");
    const template = Handlebars.compile(handlebars)({
        products,
        haveProducts: Boolean(products.length),
    });
    const HTMLContainer = document.createElement("template");
    const HTMLFragment = document.createDocumentFragment();
    const container = document.getElementById("products-section");

    HTMLContainer.innerHTML = template;
    HTMLFragment.append(HTMLContainer.content);

    if (container.textContent) container.textContent = "";
    container.append(HTMLFragment);
};

const renderOneProduct = async (product) => {
    try {
        const handlebars = await getHandlebarFile("products_row");
        const template = Handlebars.compile(handlebars)({ product });
        const HTMLContainer = document.createElement("template");
        const HTMLFragment = document.createDocumentFragment();
        const table = document.querySelector("#products-section tbody");

        HTMLContainer.innerHTML = template;
        HTMLFragment.append(HTMLContainer.content);

        table.appendChild(HTMLFragment);
    } catch {
        await renderProducts([product]);
    }
};

const renderMessages = async (chat) => {
    const handlebars = await getHandlebarFile("messages");
    const { messages } = denormalizeMessage(chat);
    const template = Handlebars.compile(handlebars)({
        messages,
        haveMessages: Boolean(messages.length),
    });
    const HTMLContainer = document.createElement("template");
    const HTMLFragment = document.createDocumentFragment();
    const container = document.getElementById("messages-container");

    HTMLContainer.innerHTML = template;
    HTMLFragment.append(HTMLContainer.content);

    if (container.textContent) container.textContent = "";
    container.append(HTMLFragment);
};

const renderOneMessage = async (message) => {
    try {
        const handlebars = await getHandlebarFile("messages_item");
        const template = Handlebars.compile(handlebars)({ message });
        const HTMLContainer = document.createElement("template");
        const HTMLFragment = document.createDocumentFragment();
        const list = document.querySelector("#messages-container ul");

        HTMLContainer.innerHTML = template;
        HTMLFragment.append(HTMLContainer.content);

        list.appendChild(HTMLFragment);
    } catch {
        await renderMessages([message]);
    }
};

const showModal = (title, content, sectionToScroll) => {
    const modal = document.querySelector("dialog");
    document.getElementById("dialog-title").textContent = title;
    document.getElementById("dialog-content").textContent = content;
    document
        .getElementById("dialog-close-btn")
        .setAttribute("data-scroll-to", sectionToScroll);

    if (!modal.open) modal.open = true;
};

const closeModal = () => {
    const modal = document.querySelector("dialog");
    if (modal.open) {
        const sectionToScroll = document
            .getElementById("dialog-close-btn")
            .getAttribute("data-scroll-to");

        document
            .getElementById(sectionToScroll)
            .scrollIntoView({ behavior: "smooth" });
        modal.open = false;
    }
};

export {
    registerPartial,
    renderMessages,
    renderOneMessage,
    renderProducts,
    renderOneProduct,
    showModal,
    closeModal,
};

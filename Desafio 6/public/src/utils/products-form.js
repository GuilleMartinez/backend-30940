import { renderOneProduct } from "./render.js";
import socket from "./socket.js";

const renderOnResponse = async ({ currentTarget: { status, response } }) => {
    if (status === 200) {
        const { added } = JSON.parse(response);
        form.reset();
        await renderOneProduct(added);
        socket.emit("product-added", added);
    } else {
        console.error(`Error adding product - ${status}.`);
    }
};

const createThumbnailInput = (event) => {
    const selectedOption = event.target.querySelector("option:checked");
    const inputContainer = document.getElementById("thumbnail-input-container");
    const fragment = document.createDocumentFragment();

    const inputID = selectedOption.value;
    const inputType = selectedOption.getAttribute("data-type");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const small = document.createElement("small");

    label.setAttribute("for", inputID);
    input.setAttribute("id", inputID);
    input.setAttribute("required", true);
    input.setAttribute("name", "thumbnail");

    if (inputType == "file") {
        small.textContent = "Only .png, .jpg or .jpeg are allowed";
        label.textContent = "Select your image";
        input.setAttribute("type", "file");
        input.setAttribute("accept", ".png, .jpg, .jpeg");
    } else {
        label.textContent = "Paste your image url";
        input.setAttribute("type", "url");
    }

    fragment.append(label, input);
    if (small.textContent) fragment.append(small);

    if (inputContainer.textContent) inputContainer.textContent = "";
    inputContainer.append(fragment);
};

const addProduct = (event) => {
    event.preventDefault();

    const renameThumbnailFile = (name) =>
        name.replace(/.+[^.png|.jpg|.jpeg]/, `thumbnail-${Date.now()}`);
    const form = document.getElementById("add-product-form");
    const req = new XMLHttpRequest();

    const body = new FormData(form);
    const thumbnail = body.get("thumbnail");

    const method = event.target.getAttribute("method");
    const url = event.target.getAttribute("action");

    if (thumbnail instanceof File) {
        const isValidFile = new RegExp(/(.png|.jpeg|.jpg)$/, "gi").test(
            thumbnail.name
        );
        if (isValidFile) {
            body.set("thumbnail", thumbnail, renameThumbnailFile(thumbnail.name));
        } else {
            return null;
        }
    }

    req.open(method, url, true);
    req.addEventListener("load", renderOnResponse);
    req.send(body);
};

export { addProduct, createThumbnailInput };

"use strict";

import { addProduct, createThumbnailInput } from "./utils/products-form.js";
import { addMessage } from "./utils/messages-form.js";
import { registerPartial, closeModal } from "./utils/render.js";
import getDate from "./utils/get-date.js";

const execute = async () => {

  Handlebars.registerHelper("date", getDate);

  const partials = [
    "messages_item",
    "messages_list",
    "products_table",
    "products_row",
    "message_card",
  ];

  await Promise.all(
    partials.map((partial) => {
      registerPartial(partial);
    })
  );

  document
    .getElementById("add-product-form")
    .addEventListener("submit", addProduct);

  document
    .getElementById("add-message-form")
    .addEventListener("submit", addMessage);

  document
    .getElementById("thumbnail-selector")
    .addEventListener("change", createThumbnailInput);

  document
    .getElementById("dialog-close-btn")
    .addEventListener("click", closeModal);
};

document.addEventListener("DOMContentLoaded", execute);

const products = require("../models/products");
const formatProduct = require("../utils/products/formatProduct");

const renderProducts = async (req, res, next) => {
  const items = await products.get();
  const { user } = req;
  return res.render("products", {
    layout: "session",
    pageTitle: "Products",
    products: items,
    haveProducts: items.length > 0,
    name: user.name,
    email: user.email,
  });
};

const addProduct = async (req, res, next) => {
  const { body, file = null } = req;
  const productAttributes = formatProduct(body, file);
  const { added } = await products.insertOne(productAttributes);
  return added ? res.status(201).json({ added }) : res.sendStatus(400);
};

const findProductById = async (req, res, next) => {
  const { id } = req.params;
  const { finded } = await products.findOne(id);
  return finded ? res.json({ product: finded }) : res.sendStatus(404);
};

const findProductByIdAndRemove = async (req, res, next) => {
  const { id } = req.params;
  const { deleted } = await products.removeOne(id);
  return deleted ? res.sendStatus(204) : res.sendStatus(404);
};

const findProductByIdAndUpdate = async (req, res, next) => {
  const { params: { id }, body, file = null } = req;
  const productAttributes = formatProduct(body, file);
  const { updated } = await products.updateOne(id, productAttributes);
  return updated ? res.sendStatus(204) : res.sendStatus(404);
};

const generateProductsMockup = (req, res) => {
  const { cant = 5 } = req.query;
  const { fork } = require("child_process");
  const child = fork("./utils/products/generateProducts.js");

  child.send(Number(cant));
  child.on("message", (products) => res.json(products));
};

module.exports = {
  renderProducts,
  addProduct,
  findProductById,
  findProductByIdAndRemove,
  findProductByIdAndUpdate,
  generateProductsMockup,
};

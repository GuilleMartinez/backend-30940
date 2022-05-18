const products = require("../models/products");
const formatProduct = require("../utils/formatProduct");

const renderProducts = async (req, res, next) => {
  const items = await products.get();
  return res.render("products_view", {
    pageTitle: "All Products",
    products: items,
    haveProducts: items.length > 0,
  });
};

const addProduct = async (req, res, next) => {
  const { body, file = null } = req;
  const productAttributes = formatProduct(body, file);
  const added = await products.insertOne(productAttributes);
  return res.status(201).json({ added });
};

const findProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await products.findOne(id);
  return product ? res.json(product) : next({ type: "not_found" });
};

const findProductByIdAndRemove = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await products.removeOne(id);
  return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

const findProductByIdAndUpdate = async (req, res, next) => {
  const { params: { id }, body, file = null } = req;
  const productAttributes = formatProduct(body, file);
  const updated = await products.updateOne(id, productAttributes);
  return updated ? res.sendStatus(204) : next({ type: "not_found" });
};

module.exports = {
  renderProducts,
  addProduct,
  findProductById,
  findProductByIdAndRemove,
  findProductByIdAndUpdate,
};

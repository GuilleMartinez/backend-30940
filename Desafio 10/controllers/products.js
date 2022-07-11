const products = require("../models/products");
const formatProduct = require("../utils/products/formatProduct");
const generateProducts = require("../utils/products/generateProducts");

const renderProducts = async (req, res, next) => {
  const items = await products.get();
  const { user } = req.session;
  return res.render("products", {
    layout: "session",
    pageTitle: "Products",
    products: items,
    haveProducts: items.length > 0,
    user,
  });
};

const addProduct = async (req, res, next) => {
  const { body, file = null } = req;
  const productAttributes = formatProduct(body, file);
  const { added, error } = await products.insertOne(productAttributes);
  return added
    ? res.status(201).json({ added })
    : next({ type: "server_error", error });
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

const generateProductsMockup = async (req, res) => {
  const { cant = 5 } = req.query;
  const products = await generateProducts(cant);
  return res.json({ products });
};

module.exports = {
  renderProducts,
  addProduct,
  findProductById,
  findProductByIdAndRemove,
  findProductByIdAndUpdate,
  generateProductsMockup,
};

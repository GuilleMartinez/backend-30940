"use strict";

const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, `./public/uploads`),
	filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const products = require("../db/products");
let productsCount = products.length;

// Request all products
router.get("/", (req, res) =>
	res.render("products_view", {
		pageTitle: "Products",
		products,
		haveProducts: products.length > 0,
	})
);

// Add a new product
router.post("/", upload.single("thumbnail"), (req, res) => {
	const { body, file } = req;

	const product = {
		id: ++productsCount,
		title: body.title,
		price: Number(body.price),
		thumbnail: file ? `./uploads/${file.originalname}` : body.thumbnail,
	};

	products.push(product);

	return res.json({ added: product });
});

// Request a product by ID
router.get("/:id", (req, res) => {
	const { id } = req.params;
	const product = products.find((product) => product.id == id);
	return product
		? res.json(product)
		: res.status(404).json({ error: "Product not found." });
});

// Edit a product by ID
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { title, price, thumbnail } = req.body;

	const index = products.findIndex((product) => product.id == id);

	if (index < 0) return res.status(404).json({ error: "Product not found." });

	products.splice(index, 1, { id, title, price, thumbnail });

	return res.json({ edited: products[index] });
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const index = products.findIndex((product) => product.id == id);

	if (index < 0) return res.status(404).json({ error: "Product not found" });

	const deleted = products[index];
	const filePattern = new RegExp(/thumbnail-.+(.png|.jpeg|.jpg)$/, "gi");

	if (filePattern.test(deleted.thumbnail)) {
		const [fileName] = deleted.thumbnail.match(filePattern);
		fs.unlink(`./public/uploads/${fileName}`, (err) =>
			err
				? console.log(`Error deleting thumbnail file '${fileName}': ${err.message}.`)
				: console.log(`Thumbnail file '${fileName}' deleted.`)
		);
	}

	products.splice(index, 1);
	return res.json({ deleted: deleted });

});

module.exports = router;

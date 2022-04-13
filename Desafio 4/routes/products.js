const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads"),
	filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now()),
});

const upload = multer({ storage });

const products = [
	{
		id: 1,
		title: "veniam consequat",
		price: 500,
		thumbnail: "http://placehold.it/120x120",
	},
	{
		id: 2,
		title: "minim Lorem",
		price: 630,
		thumbnail: "http://placehold.it/120x120",
	},
];

// Request all products
router.get("/", (req, res) => res.json(products));

// Add a new product
router.post("/", upload.single("thumbnail"), (req, res) => {
	const { body, file } = req;

	const product = {
		id: products.length + 1,
		title: body.title,
		price: Number(body.price),
		thumbnail: file ? file.filename : body.thumbnail,
	};

	products.push(product);

	return res.status(201).json({ added: product });
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

// Delete a producy by ID
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const index = products.findIndex((product) => product.id == id);

	if (index < 0) return res.status(404).json({ error: "Product not found" });

	const deleted = products[index];

	fs.unlink(`./uploads/${deleted.thumbnail}`, (err) => {
		if (!err)
			return console.log(`Thumbnail file '${deleted.thumbnail}' deleted.`);
	});

	products.splice(index, 1);

	return res.json({ deleted: deleted });
});

module.exports = { productRouter: router };

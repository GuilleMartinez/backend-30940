"use stric";

const express = require("express");
const Container = require("./Container");

const app = express();
const port = process.env.PORT || 8080;
const container = new Container("products.json");

async function getProducts(req, res) {
	const products = await container.getAll();
	return res.json(products);
}

async function getRandomProduct(req, res) {
	const products = await container.getAll();
	const index = Math.floor( Math.random() * products.length );
	return res.json(products[index]);
}

app
.get("/productos", getProducts)
.get("/productoRandom", getRandomProduct);

app.listen(port, () => console.log(`Server listening on port ${port}`) );

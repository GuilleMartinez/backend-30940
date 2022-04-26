"use strict";

const express = require("express");

const app = express();
const port = 8080;
const productRouter = require("./routes/products");

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use("/productos", productRouter);

app.get("/", (req, res) => res.render("index", { pageTitle: "Home" }));


app.listen(port, (err) =>
    err ? console.log(err) : console.log(`Server listening on port ${port}.`)
);

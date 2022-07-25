module.exports = (app) => {
    const { Router } = require("express");
    const router = Router();

    const { generateProductsMockup } = require("../controllers/products");
    const {
        generateRandomNumbersWithCount,
        renderProcessInformation,
    } = require("../controllers/app");

    router.get("/products", generateProductsMockup);
    router.get("/randoms", generateRandomNumbersWithCount);
    router.get("/info", renderProcessInformation);

    app.use("/api/", router);
};

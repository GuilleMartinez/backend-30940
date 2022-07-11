module.exports = (app) => {
    const { Router } = require("express");
    const { addMessage } = require("../controllers/messages");
    const router = Router();

    router.post("/", addMessage);

    app.use("/messages", router);
};

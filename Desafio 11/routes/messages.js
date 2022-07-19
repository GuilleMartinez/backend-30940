module.exports = (app) => {
    const { Router } = require("express");
    const { addMessage } = require("../controllers/messages");
    const auth = require("../utils/session/auth");

    const router = Router();

    router.post("/", auth, addMessage);

    app.use("/messages", router);
};

"use strict";

const { Router } = require("express");
const database = require("../models/messages");
const router = Router();


router.post("/", async (req, res) => {
    const message = await database.write(req.body);
    return res.json({ added: message });
})

module.exports = router;
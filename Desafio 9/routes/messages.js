"use strict";

const { Router } = require("express");
const { addMessage } = require("../controllers/messages");
const router = Router();

router.post("/", addMessage);

module.exports = router;

"use strict";

const { Router } = require("express");
const router = Router();
const { createSession, destroySession } = require("../controllers/session");

const auth = require("../utils/session/auth");
const renderMainPage = require("../utils/render/renderMainPage")
const renderLoginPage = require("../utils/render/renderLoginPage");

router.get("/", auth, renderMainPage);
router.get("/login", renderLoginPage);
router.get("/logout", destroySession);
router.post("/login", createSession);

module.exports = router;
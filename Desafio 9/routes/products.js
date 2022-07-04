"use strict";

const { Router } = require("express");
const multer = require("multer");
const auth = require("../utils/session/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `./public/uploads`),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const router = Router();
const upload = multer({ storage });

const {
  renderProducts,
  addProduct,
  findProductById,
  findProductByIdAndUpdate,
  findProductByIdAndRemove,
  generateProductsMockup,
} = require("../controllers/products");

router.get("/test", generateProductsMockup);
router.get("/", auth, renderProducts);
router.get("/:id", auth, findProductById);
router.post("/", auth, upload.single("thumbnail"), addProduct);
router.put("/:id", auth, findProductByIdAndUpdate);
router.delete("/:id", auth, findProductByIdAndRemove);

module.exports = router;

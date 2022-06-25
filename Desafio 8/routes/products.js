"use strict";

const { Router } = require("express");

const multer = require("multer");

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

router.get("/", renderProducts);
router.post("/", upload.single("thumbnail"), addProduct);
router.get("/:id", findProductById);
router.put("/:id", findProductByIdAndUpdate);
router.delete("/:id", findProductByIdAndRemove);
router.get("/test", generateProductsMockup);

module.exports = router;

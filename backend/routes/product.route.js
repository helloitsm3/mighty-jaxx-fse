const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

router.get("/:page", productController.get);
router.put("/:id", authenticate, productController.update);
router.delete("/:id", authenticate, productController.remove);
router.post("/create", authenticate, productController.create);
router.post("/search", authenticate, productController.search);

module.exports = router;

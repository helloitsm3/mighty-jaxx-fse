const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

router.post("/create", authenticate, productController.create);
router.put("/:id", authenticate, productController.update);
router.delete("/:id", authenticate, productController.remove);

module.exports = router;

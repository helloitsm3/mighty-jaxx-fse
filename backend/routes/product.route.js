const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/create", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;

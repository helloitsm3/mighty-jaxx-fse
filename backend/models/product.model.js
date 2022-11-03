const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", schema);

module.exports = Product;

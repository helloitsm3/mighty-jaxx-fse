const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

schema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", schema);

module.exports = Product;

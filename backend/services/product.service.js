const Product = require("../models/product.model");

async function create(product) {
  const { sku, title, image } = { ...product };
  const newProduct = new Product({ sku, title, image });
  await newProduct.save();

  return { message: "Successfully created product" };
}

async function update(id, product) {
  const { sku, title, image } = { ...product };
  try {
    const newProduct = await Product.findOneAndUpdate(
      { _id: id },
      { sku, title, image }
    );
    await newProduct.save();

    return { status: 200, message: "Successfully updated product information" };
  } catch (err) {
    return { status: 404, message: "Failed to update product information." };
  }
}

async function remove(id) {
  try {
    await Product.findOneAndDelete({ _id: id });

    return {
      status: 200,
      message: `Successfully deleted product with ID: ${id}`,
    };
  } catch (err) {
    return { status: 404, message: `Failed to delete product with ID: ${id}` };
  }
}

module.exports = {
  create,
  update,
  remove,
};
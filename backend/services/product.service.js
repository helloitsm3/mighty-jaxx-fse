const Product = require("../models/product.model");

async function get(page = 1, limit = 10) {
  const options = {
    page: page,
    limit: limit,
    collation: {
      locale: "en",
    },
  };

  return Product.paginate({}, options, (err, result) => {
    return result;
  });
}

async function create(product) {
  const { sku, name, image } = { ...product };
  const newProduct = new Product({ sku, title: name, image });
  await newProduct.save();

  return { status: 200, message: "Successfully created product" };
}

async function update(id, product) {
  const { sku, name, image } = { ...product };
  try {
    const newProduct = await Product.findOneAndUpdate(
      { _id: id },
      { sku, title: name, image }
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

async function search(search) {
  try {
    const data = await Product.find({
      $or: [
        { sku: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ],
    }).exec();

    return {
      status: 200,
      message: `Successfully search product`,
      data,
    };
  } catch (err) {
    return { status: 404, message: `Failed to search product` };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  search,
};

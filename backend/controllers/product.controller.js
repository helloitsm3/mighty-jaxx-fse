const products = require("../services/product.service");

async function create(req, res, next) {
  try {
    res.json(await products.create(req.body));
  } catch (err) {
    console.error(`Error creating product`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { status, message } = await products.update(req.params.id, req.body);
    res.status(status).json(message);
  } catch (err) {
    console.error(`Error updating product`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { status, message } = await products.remove(req.params.id);
    res.status(status).json(message);
  } catch (err) {
    console.error(`Error updating product`, err.message);
    next(err);
  }
}

module.exports = {
  create,
  update,
  remove,
};

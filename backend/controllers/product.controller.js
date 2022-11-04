const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const products = require("../services/product.service");
require("dotenv").config();

async function get(req, res, next) {
  try {
    res.json(await products.get(req.params.page, 10));
  } catch (err) {
    console.error(`Error fetching product`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    if (req.files) {
      // File upload

      var bodyData = new FormData();
      bodyData.append("image", req.files.file.data.toString("base64"));

      axios
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMGBB_KEY}`,
          bodyData
        )
        .then(async (response) => {
          const image_url = response.data.data.image.url;

          const data = {
            image: image_url,
            sku: req.body.sku,
            name: req.body.name,
          };
          const { status, message } = await products.create(data);
          res.status(status).json(message);
        })
        .catch((err) => {
          res.status(400).json("Failed to upload image");
        });
    } else {
      console.error(
        `Error creating product. Image is not provided`,
        err.message
      );
      next(err);
    }
  } catch (err) {
    console.error(`Error creating product`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    if (req.files) {
      // File upload
      var bodyData = new FormData();
      bodyData.append("image", req.files.file.data.toString("base64"));

      axios
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMGBB_KEY}`,
          bodyData
        )
        .then(async (response) => {
          const image_url = response.data.data.image.url;

          const data = {
            image: image_url,
            sku: req.body.sku,
            name: req.body.name,
          };
          const { status, message } = await products.update(
            req.params.id,
            data
          );
          res.status(status).json(message);
        })
        .catch(() => res.status(400).json("Failed to upload image"));
    } else {
      // Update without uploading image
      const data = {
        image: req.body.file,
        sku: req.body.sku,
        name: req.body.name,
      };
      const { status, message } = await products.update(req.params.id, data);
      res.status(status).json(message);
    }
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
    console.error(`Error removing product`, err.message);
    next(err);
  }
}

async function search(req, res, next) {
  try {
    const { search } = req.body;

    if (search) {
      const { status, data } = await products.search(search);
      res.status(status).json(data);
    } else {
      res.json(await products.get(1, 10));
    }
  } catch (err) {
    console.error(`Error searching product`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  search,
};

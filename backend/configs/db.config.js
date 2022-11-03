require("dotenv").config();

const env = process.env;

const db = {
  host: env.DB_HOST,
};

module.exports = db;

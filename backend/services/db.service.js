const mongoose = require("mongoose");
const dbConfig = require("../configs/db.config");

async function connect() {
  try {
    await mongoose.connect(dbConfig.host);
    console.log("Successfully connected to mongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  connect,
};

const mongoose = require("mongoose");
const dbConfig = require("../configs/db.config");

async function connect() {
  try {
    await mongoose.connect(dbConfig.host, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function checkConnection() {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("MongoDB Connected successfully");
  });
}

module.exports = {
  connect,
  checkConnection,
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

module.exports = {
  generateJWT,
};

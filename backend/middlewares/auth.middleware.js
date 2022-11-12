const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const authHeader = req?.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).json({ message: "Token not found" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Unauthorized access" });
      if (user.role !== "admin")
        return res.status(403).json({ message: "Unauthorized access" });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(404).json({ message: "Authorization header not found" });
  }
};

module.exports = {
  authenticate,
};

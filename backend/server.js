const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./services/db.service");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const app = express();
const port = process.env.PORT || 3001;

db.connect();
db.checkConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/healthcheck", (req, res) => {
  res.send("Server is healthy!");
});

app.use("/auth", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

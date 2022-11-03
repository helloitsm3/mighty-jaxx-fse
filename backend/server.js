const express = require("express");
const bodyParser = require("body-parser");
const db = require("./services/db.service");
const userRoutes = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 3001;

db.connect();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

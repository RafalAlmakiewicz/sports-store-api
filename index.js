require("express-async-errors");
const express = require("express");
const cors = require("cors");
const products = require("./routes/products");
const activities = require("./routes/activities");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const seed = require("./routes/seed");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/SportsStore/api/users", users);
app.use("/SportsStore/api/auth", auth);
app.use("/SportsStore/api/products", products);
app.use("/SportsStore/api/activities", activities);
app.use("/SportsStore/api/seed", seed);
app.use(express.static("public"));
//app.use(error);

mongoose
  .connect("mongodb://localhost/sports-store")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`sports-store on port ${port}...`));

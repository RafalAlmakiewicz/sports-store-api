const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");
const { ObjectID } = require("mongodb");
const authorize = require("../middleware/authorize");
const validateId = require("../middleware/validateId");

router.get("/", async (req, res) => {
  const products = await Product.find().populate("activity", "name _id");
  res.send(products);
});

router.get(`/:id`, validateId, async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "activity",
    "name -_id"
  );
  if (!product) return res.status(404).send("not found");
  res.send(product);
});

router.post("/", authorize, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    activity: req.body.activity,
    description: req.body.description,
  });
  await product.save();
  res.send(product);
});

router.put(`/:id`, authorize, validateId, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("not found");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  product.name = req.body.name;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.activity = req.body.activity;
  product.description = req.body.description;
  await product.save();
  res.send(product);
});

router.delete(`/:id`, authorize, validateId, async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("not found");
  res.send(product);
});

module.exports = router;

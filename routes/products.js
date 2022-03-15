const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");
const authorize = require("../middleware/authorize");
const validateId = require("../middleware/validateId");

router.get("/", async (req, res) => {
  const products = await Product.find().populate("activity", "-__v");
  res.send(products);
});

router.get(`/:id`, validateId, async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "activity",
    "-__v"
  );
  if (!product) return res.status(404).send("not found");
  res.send(product);
});

router.post("/", authorize, async (req, res) => {
  let body = prepareReqBody(req.body);
  const { error } = validate(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let product = new Product({
    name: body.name,
    price: body.price,
    stock: body.stock,
    activity: body.activity,
    description: body.description,
  });
  await product.save();
  product = await Product.findById(product._id).populate("activity", "-__v");
  res.send(product);
});

router.put(`/:id`, authorize, validateId, async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("not found");
  let body = prepareReqBody(req.body);
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  product.name = body.name;
  product.price = body.price;
  product.stock = body.stock;
  product.activity = body.activity;
  product.description = body.description;
  await product.save();
  product = await Product.findById(req.params.id).populate("activity", "-__v");
  res.send(product);
});

router.delete(`/:id`, authorize, validateId, async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("not found");
  res.send(product);
});

module.exports = router;

function prepareReqBody(reqBody) {
  let body = { ...reqBody };
  if (body._id) delete body._id;
  return typeof body.activity === "object"
    ? { ...body, activity: body.activity._id }
    : body;
}

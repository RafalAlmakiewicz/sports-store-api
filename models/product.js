const mongoose = require("mongoose");
const Joi = require("joi");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
  })
);

const validate = (product) => {
  const schema = Joi.object({
    name: Joi.string().max(200).required(),
    price: Joi.number().required(),
    stock: Joi.number().min(0).integer().required(),
    activity: Joi.objectId().required(),
    description: Joi.string().max(1000),
  });
  return schema.validate(product);
};

exports.Product = Product;
exports.validate = validate;

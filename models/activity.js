const mongoose = require("mongoose");
const Joi = require("joi");

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      unique: true,
    },
  })
);

const validate = (activity) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  });
  return schema.validate(activity);
};

exports.Activity = Activity;
exports.validate = validate;

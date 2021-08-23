const mongoose = require("mongoose");
const Joi = require("joi");

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
  })
);

const validate = (activity) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
  });
  return schema.validate(activity);
};

exports.Activity = Activity;
exports.validate = validate;

const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    login: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxlength: 1024,
    },
  })
);

const validate = (user) => {
  const schema = Joi.object({
    login: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validate;

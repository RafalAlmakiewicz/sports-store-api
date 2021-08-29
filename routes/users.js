const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ login: req.body.login });
  if (user) return res.status(400).send("user already registered");

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(req.body.password, salt);

  user = new User({
    login: req.body.login,
    password: hashed,
  });
  await user.save();
  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  res.header("auth-token", token).send({ login: user.login });
});

module.exports = router;

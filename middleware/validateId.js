const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("bad id");
    return res.status(400).send("Invalid id");
  }
  next();
};

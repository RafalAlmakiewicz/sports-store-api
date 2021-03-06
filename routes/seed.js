const express = require("express");
const router = express.Router();
const seedDb = require("../seedDb");
const authorize = require("../middleware/authorize");

router.post("/", authorize, async (req, res) => {
  await seedDb();
  res.send("Seeded database with default data.");
});

module.exports = router;

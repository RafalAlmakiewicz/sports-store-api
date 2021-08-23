const express = require("express");
const router = express.Router();
const { Activity, validate } = require("../models/activity");
const { ObjectID } = require("mongodb");
const authorize = require("../middleware/authorize");

router.get("/", async (req, res) => {
  const activities = await Activity.find();
  res.send(activities);
});

router.get(`/:id`, async (req, res) => {
  const activity = await Activity.find({ id: ObjectID(req.params.id) });
  if (!activity) return res.status(404).send("not found");
  res.send(activity);
});

router.post("/", authorize, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let activity = new Activity({
    name: req.body.name,
  });
  await activity.save();
  res.send(activity);
});

router.put(`/:id`, authorize, async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).send("not found");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  activity.name = req.body.name;
  await activity.save();
  res.send(activity);
});

router.delete(`/:id`, authorize, async (req, res) => {
  const activity = await Activity.findByIdAndRemove(req.params.id);
  if (!activity) return res.status(404).send("not found");
  res.send(activity);
});

module.exports = router;

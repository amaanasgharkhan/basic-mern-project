const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userData = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const single = await User.findById(id);
    res.status(200).json(single);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

module.exports = router;

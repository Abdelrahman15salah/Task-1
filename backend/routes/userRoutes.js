const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Add a new user
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});

module.exports = router;
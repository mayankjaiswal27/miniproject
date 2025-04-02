const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({  name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
    res.json({ token, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid password');
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
    res.json({ token, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;

const express = require('express');
const FIRForm = require('../models/FIRForm');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.post('/submit', verifyToken, async (req, res) => {
  try {
    const form = new FIRForm({ ...req.body, submittedBy: req.user.id });
    await form.save();
    res.status(200).send('Form submitted');
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});

router.get('/forms', verifyToken, async (req, res) => {
  try {
    const forms = await FIRForm.find({ submittedBy: req.user.id });
    res.json(forms);
  } catch (error) {
    res.status(500).send('Error fetching forms');
  }
});

module.exports = router;

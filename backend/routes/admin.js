const express = require('express');
const FIRForm = require('../models/FIRForm');
const User = require('../models/User'); // Import the User model
const { verifyToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Fetch pending forms with user details
router.get('/pending-forms', verifyToken, isAdmin, async (req, res) => {
  try {
    const forms = await FIRForm.aggregate([
      { $match: { status: 'Pending' } },
      {
        $lookup: {
          from: 'users', // Collection name of the User model
          localField: 'submittedBy',
          foreignField: '_id',
          as: 'submittedByDetails'
        }
      },
      { $unwind: { path: '$submittedByDetails', preserveNullAndEmptyArrays: true } }
    ]);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching pending forms:', error);
    res.status(500).send('Error fetching forms');
  }
});

// Fetch approved forms with user details
// Fetch approved forms with user details
router.get('/approved-forms', verifyToken, isAdmin, async (req, res) => {
  try {
    const forms = await FIRForm.aggregate([
      { $match: { status: 'Approved' } },
      {
        $lookup: {
          from: 'users', // Collection name of the User model
          localField: 'submittedBy', // Field in FIRForm containing user ID
          foreignField: '_id', // Field in User collection
          as: 'result' // Output array field
        }
      },
      { $unwind: { path: '$result', preserveNullAndEmptyArrays: true } } // Flatten the array
    ]);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching approved forms:', error);
    res.status(500).send('Error fetching approved forms');
  }
});


// Approve a form by ID
router.post('/approve/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const form = await FIRForm.findById(req.params.id);
    if (!form) {
      return res.status(404).send('Form not found');
    }

    form.status = 'Approved';
    await form.save();
    res.status(200).send('Form approved');
  } catch (error) {
    console.error('Error approving form:', error);
    res.status(500).send('Error approving form');
  }
});

// Reject a form by ID
router.post('/reject/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const form = await FIRForm.findById(req.params.id);
    if (!form) {
      return res.status(404).send('Form not found');
    }

    form.status = 'Rejected';
    await form.save();
    res.status(200).send('Form rejected');
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).send('Error rejecting form');
  }
});

module.exports = router;

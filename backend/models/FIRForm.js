const mongoose = require('mongoose');

const firFormSchema = new mongoose.Schema({
  district: { type: String, required: true },
  ps: { type: String, required: true },
  year: { type: String, required: true },
  firNo: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
});

const FIRForm = mongoose.model('FIRForm', firFormSchema);
module.exports = FIRForm;

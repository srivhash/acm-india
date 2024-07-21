const mongoose = require('mongoose');

const pairingRequestSchema = new mongoose.Schema({
  mentee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming mentees are stored in the User collection
    required: true,
  },
  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  researchProblem: {
    type: String,
    required: true,
  },
  attendedBefore: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  request_date: {
    type: Date,
    default: Date.now,
  },
});

const PairingRequest = mongoose.model('PairingRequest', pairingRequestSchema);

module.exports = PairingRequest;
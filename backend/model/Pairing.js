const mongoose = require('mongoose');

const pairingRequestSchema = new mongoose.Schema({
  mentee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentee',
    required: true,
  },
  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
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
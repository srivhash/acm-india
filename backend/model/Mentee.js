const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  preferred_mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
  },
  pairing_request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PairingRequest',
  },
});

const Mentee = mongoose.model('Mentee', menteeSchema);

module.exports = Mentee;
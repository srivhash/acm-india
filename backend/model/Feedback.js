const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
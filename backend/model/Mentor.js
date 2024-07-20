const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meeting_link: {
    type: String,
    required: true,
  },
  availability: {
    type: String, // Consider using a more structured format for availability if needed
  },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
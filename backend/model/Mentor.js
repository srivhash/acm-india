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
  website : {
    type: String,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  meeting_link: {
    type: String,
    required: true,
  },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
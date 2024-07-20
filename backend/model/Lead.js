const mongoose = require('mongoose');

const programLeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProgramLead = mongoose.model('ProgramLead', programLeadSchema);

module.exports = ProgramLead;
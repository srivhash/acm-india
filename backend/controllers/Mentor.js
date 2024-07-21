const Mentor = require('../model/Mentor');

// Create a new mentor
exports.createMentor = async (req, res) => {
  try {
    const { name, description, website, affiliation, meeting_link } = req.body;

    const newMentor = new Mentor({
      name,
      description,
      website,
      affiliation,
      meeting_link,
    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a mentor by ID
exports.updateMentor = async (req, res) => {
  try {
    const { name, description, website, affiliation, meeting_link } = req.body;

    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { name, description, website, affiliation, meeting_link },
      { new: true, runValidators: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a mentor by ID
exports.deleteMentor = async (req, res) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!deletedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
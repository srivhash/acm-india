const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/Mentor');

// Create a new mentor
router.post('/', mentorController.createMentor);

// Get all mentors
router.get('/', mentorController.getAllMentors);

// Get a mentor by ID
router.get('/:id', mentorController.getMentorById);

// Update a mentor by ID
router.put('/:id', mentorController.updateMentor);

// Delete a mentor by ID
router.delete('/:id', mentorController.deleteMentor);

module.exports = router;
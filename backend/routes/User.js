const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

// Protected routes
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile',  authMiddleware, userController.updateUserProfile);
router.delete('/profile', authMiddleware , userController.deleteUser);

module.exports = router;
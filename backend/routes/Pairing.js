const express = require('express');
const router = express.Router();
const pairingRequestController = require('../controllers/pairingController');
const { authMiddleware } = require('../middleware/auth');

// Protected route to create a pairing request
router.post('/pairing-request', authMiddleware, pairingRequestController.createPairingRequest);
router.get('/pending-request', pairingRequestController.getAllPendingRequests);
router.put('/approve-request/:id', pairingRequestController.approvePairingRequest);
router.put('/reject-request/:id', pairingRequestController.rejectPairingRequest);
router.get('/pairing-requests', authMiddleware, pairingRequestController.getPairingRequests);

module.exports = router;
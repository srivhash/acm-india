const express = require('express');
const router = express.Router();
const pairingRequestController = require('../controllers/pairingController');
const { authMiddleware } = require('../middleware/auth');
const { roleMiddleware } = require('../middleware/role');

// Protected route to create a pairing request
router.post('/pairing-request', authMiddleware, pairingRequestController.createPairingRequest);
router.get('/pending-request',authMiddleware, roleMiddleware('admin'), pairingRequestController.getAllPendingRequests);
router.put('/approve-request/:id', authMiddleware, roleMiddleware('admin'),pairingRequestController.approvePairingRequest);
router.put('/reject-request/:id', authMiddleware, roleMiddleware('admin'),pairingRequestController.rejectPairingRequest);
router.get('/pairing-requests', authMiddleware, roleMiddleware('admin'),pairingRequestController.getPairingRequests);

module.exports = router;
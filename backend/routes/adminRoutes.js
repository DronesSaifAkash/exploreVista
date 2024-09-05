// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/upload'); // Path to your upload.js
const DC = require('../controllers/districtController');
const DestinationController = require('../controllers/destinationsController');
const { verifyToken, checkAdmin } = require('../middleware/adminMiddleware');

router.get('/districts', verifyToken, checkAdmin, DC.listDistricts);
router.post('/districts', verifyToken, checkAdmin, DC.createDistrict);

router.get('/destinations', verifyToken, checkAdmin, DestinationController.getAllDestinations);
router.post('/destinations', verifyToken, checkAdmin, upload, DestinationController.createDestination);
router.get('/destinations/:id', verifyToken, checkAdmin, DestinationController.getDestinationById);
router.put('/destinations/:id', verifyToken, checkAdmin, upload, DestinationController.updateDestination);
router.delete('/destinations/:id', verifyToken, checkAdmin, DestinationController.deleteDestination);

module.exports = router;

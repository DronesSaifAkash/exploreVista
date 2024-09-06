// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const { uploadDistrict, uploadDestination } = require('../config/upload');

const { verifyToken, checkAdmin } = require('../middleware/adminMiddleware');

const adminController = require('../controllers/adminController');
const DC = require('../controllers/districtController');
const DestinationController = require('../controllers/destinationsController');


router.get('/districts', verifyToken, checkAdmin, DC.listDistricts);
router.post('/districts', verifyToken, checkAdmin, DC.createDistrict);

// not in use  router.post('/add-district', verifyToken, checkAdmin, uploadDistrict.single('image'), adminController.addDistrict);

router.get('/destinations', verifyToken, checkAdmin, DestinationController.getAllDestinations);
router.post('/add-destination', verifyToken, checkAdmin, uploadDestination.single('image'), adminController.addDestination);
router.get('/destinations/:id', verifyToken, checkAdmin, DestinationController.getDestinationById);
router.put('/destinations/:id', verifyToken, checkAdmin, uploadDestination.single('image'), adminController.updateDestination);
router.delete('/destinations/:id', verifyToken, checkAdmin, adminController.deleteDestination);

router.get('/contacts', verifyToken, checkAdmin, adminController.getAllContacts);

module.exports = router;

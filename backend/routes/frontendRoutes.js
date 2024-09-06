const express = require('express');
const router = express.Router();

const DistrictController = require('../controllers/districtController');
const DestinationsController = require('../controllers/destinationsController');
const frontendController = require('../controllers/frontendController');


router.get('/districts', DistrictController.listDistricts);
router.get('/destinations', DestinationsController.getAllDestinations);
router.post('/contact', frontendController.submitContactForm);

module.exports = router;
const express = require('express');
const router = express.Router();

const DistrictController = require('../controllers/districtController');
const DestinationsController = require('../controllers/destinationsController');


router.get('/districts', DistrictController.listDistricts);
router.get('/destinations', DestinationsController.getAllDestinations);
module.exports = router;
const express = require('express');
const router = express.Router();

const DistrictController = require('../controllers/districtController');
const DestinationsController = require('../controllers/destinationsController');
const frontendController = require('../controllers/frontendController');


router.post('/contact', frontendController.submitContactForm);
router.get('/tour-packages', frontendController.getAlltourDetails);
router.get('/about-us', frontendController.getAboutUsDetails);

router.get('/districts', frontendController.listDistricts);
router.get('/districtNameOnly', frontendController.districtNameOnly)
router.get("/districts/:id",frontendController.getDistrictInfo );

router.get('/destinations', frontendController.getAllDestinations);
router.get('/destinations/:id',frontendController.getDestinationInfo );

module.exports = router;
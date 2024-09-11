// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { uploadDistrict, uploadDestination } = require('../config/upload');
const { verifyToken, checkAdmin } = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');
const DC = require('../controllers/districtController');
const DestinationController = require('../controllers/destinationsController');

router.use(verifyToken);
router.use(checkAdmin);

router.get('/districts', DC.listDistricts);
router.post('/districts', DC.createDistrict);

// not in use  router.post('/add-district', uploadDistrict.single('image'), adminController.addDistrict);

router.get('/destinations', adminController.getAllDestinations);
router.post('/add-destination', uploadDestination.single('image'), adminController.addDestination);
router.get('/destinations/:id', adminController.getDestinationById);
router.put('/destinations/:id', uploadDestination.single('image'), adminController.updateDestination);
router.delete('/destinations/:id', adminController.deleteDestination);

router.get('/contacts', adminController.getAllContacts);
router.get('/contacts/:id',  adminController.getContactById);
router.post('/contacts/:id/reply',  adminController.replyToContact);

router.get('/tour-packages', adminController.getTourPackages);
router.post('/add-tour-packages', adminController.createTourPackage);
// router.put('/tour-packages/:id', adminController.updateTourPackage);
router.delete('/tour-packages/:id', adminController.deleteTourPackage);

router.patch('/tour-packages/:id/availability', adminController.updateAvailabilityOfTourPackageById);
router.get('/tour-packages/:id', adminController.getTourPackageById);
router.put('/edit-tour-packages/:id', adminController.updateTourPackage);

router.get('/about-us', adminController.getAboutUs);
router.put('/update-about-us', adminController.updateAboutUs);
module.exports = router;

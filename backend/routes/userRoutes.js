const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

const { verifyToken, checkUser } = require('../middleware/userMiddleware');

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.use(verifyToken);
router.use(checkUser);

router.get('/profile', userController.getProfileInfo);
router.get('/contacts', userController.getUserContacts);

router.get('/contacts/:id',  userController.getContactById);
router.post('/contacts/:id/reply',  userController.replyToContact);

router.get('/tour-packages/:id',  userController.getTourPackageById);
router.post('/book', userController.createBooking);
router.get('/booking-packages/:userId', userController.getUserBookings);


module.exports = router;
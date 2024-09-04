const express = require('express');
const router = express.Router();

// const { registerUser, loginUser, testing } = require('../controllers/userController');
// router.post('/register', registerUser);
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/test', testing)

const UserController = require('../controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/testing', UserController.testing);
router.get('/profile', UserController.profile);

const DC = require('../controllers/districtController');

router.get('/districts', DC.listDistricts);



module.exports = router;

const express = require('express');
const router = express.Router();

const { verifyToken, checkAdmin } = require('../middleware/adminMiddleware');

// const { createDistrict, listDistricts } = require('../controllers/districtController');
const DC = require('../controllers/districtController');

router.get('/districts', verifyToken, checkAdmin, DC.listDistricts);
router.post('/districts', verifyToken, checkAdmin, DC.createDistrict);

module.exports = router;

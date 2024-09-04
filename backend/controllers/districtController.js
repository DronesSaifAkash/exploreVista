const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const District = require('../models/district');

class DistrictController {
    async createDistrict (req, res)  {
        const { code, name, thumbnail } = req.body;
    
        try {
            const newDistrict = new District({ code, name, thumbnail });
            await newDistrict.save();
            res.status(201).json(newDistrict);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    async listDistricts (req, res)  {
        try {
            const districts = await District.find({});
            res.status(200).json(districts);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }
}

module.exports = new DistrictController();

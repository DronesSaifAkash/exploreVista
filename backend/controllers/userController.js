const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    // Register User
    async registerUser(req, res) {
        
        const { name, email, password } = req.body;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Login User
    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            //  m for minutes, h for hours, d for days, etc. 300 means 300 secs, 

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Testing server
    testing(req, res) {
        res.status(200).json({ message: "Server is running" });
    }
}

module.exports = new UserController();
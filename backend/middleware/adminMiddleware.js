const User = require('../models/user');
const { verifyToken } = require('./authMiddleware');

exports.checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user || user.type !== 'admin') {
            return res.status(403).json({ message: 'Require Admin Role!' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.verifyToken = verifyToken;

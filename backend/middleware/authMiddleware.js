const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Extract token from Authorization header
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }
        // The token should be in the format "Bearer <token>"
        const token = authHeader.split(' ')[1]; // Split by space and get the token part

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to authenticate token', err: err });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { verifyToken };

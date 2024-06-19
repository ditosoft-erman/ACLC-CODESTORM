const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const authenticateJWT = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId, email: decoded.email }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const authorizeRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await Users.findByPk(req.user.userId);
            if (user && user.role === role) {
                next();
            } else {
                res.status(403).json({ error: `Access denied. Only ${role}s can perform this action.` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error while checking role.' });
        }
    };
};

module.exports = { authenticateJWT, authorizeRole };

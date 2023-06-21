const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
        name: user.name,
        email: user.email,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    const payload = {
        userId: user._id,
        tokenVersion: user.tokenVersion,
    };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
};

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is missing or invalid',
            });
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!payload) {
            return res.status(401).json({
                success: false,
                message: 'Access token is missing or invalid',
            });
        }

        if (payload) {
            req.user = payload;
            return next();
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Access token is missing or invalid',
        });
    }
};


const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to access this resource',
            });
        }
        next();
    };
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateUser,
    authenticate,
    authorize,
};

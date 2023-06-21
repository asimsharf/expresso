const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options);
};

const registerUser = async (name, email, password) => {
    try {
        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { registerUser, loginUser };
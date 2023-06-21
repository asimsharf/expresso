const User = require('../models/userModel');

const createUser = async (name, email, password) => {
    try {
        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateUser = async (userId, name, email, password) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.remove();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createUser, getUserById, updateUser, deleteUser };
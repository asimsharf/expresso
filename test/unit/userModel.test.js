const mongoose = require('mongoose');
const User = require('../../src/models/userModel');
const environment = require('../../src/config/environment');

describe('User model', () => {
    beforeAll(async () => {
        await mongoose.connect(environment.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should hash the password before saving the user', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        expect(user.password).not.toBe('password');
    });

    it('should compare the password with the hashed password', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        expect(await user.comparePassword('password')).toBe(true);
    });

    it('should return the user object without the password field', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        expect(user.toJSON()).not.toHaveProperty('password');
    });

    it('should return the user object without the password field when using the find method', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        const foundUser = await User.findOne({ email: 'johndoe@gmail.com' });
        expect(foundUser.toJSON()).not.toHaveProperty('password');
    });
});

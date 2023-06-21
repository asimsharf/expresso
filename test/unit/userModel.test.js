const mongoose = require('mongoose');
const User = require('../../src/models/userModel');

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('should create a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).not.toBe(userData.password);
    });

    test('should not create a user without a name', async () => {
        const userData = {
            email: 'john@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        let error;
        try {
            const savedUser = await user.save();
            error = savedUser;
        } catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.name).toBeDefined();
    });

    test('should not create a user without an email', async () => {
        const userData = {
            name: 'John Doe',
            password: 'password123',
        };
        const user = new User(userData);
        let error;
        try {
            const savedUser = await user.save();
            error = savedUser;
        } catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.email).toBeDefined();
    });

    test('should not create a user without a password', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
        };
        const user = new User(userData);
        let error;
        try {
            const savedUser = await user.save();
            error = savedUser;
        } catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.password).toBeDefined();
    });

    test('should hash the password before saving', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        const savedUser = await user.save();
        expect(savedUser.password).not.toBe(userData.password);
    });

    test('should authenticate user with correct password', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        const savedUser = await user.save();
        const authenticatedUser = await User.authenticate(userData.email, userData.password);
        expect(authenticatedUser._id).toEqual(savedUser._id);
    });

    test('should not authenticate user with incorrect password', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        await user.save();
        const authenticatedUser = await User.authenticate(userData.email, 'wrongpassword');
        expect(authenticatedUser).toBeNull();
    });
});
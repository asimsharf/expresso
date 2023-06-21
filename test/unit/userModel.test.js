const db = require('../../src/config/database');
const User = require('../../src/models/userModel');
const app = require('../../src/index');
const environment = require('../../src/config/environment');

describe('User model', () => {


    beforeAll(async () => {
        await db.connect(
            environment.databaseUrl,
        );
    });

    afterAll(async () => {
        await db.disconnect();
    });


    it('should retrieve all users', async () => {
        const users = await User.find();
        console.log(users);
        expect(users.length).toBeGreaterThanOrEqual(0);
    });

});

const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/index');
const db = require('../../src/config/database');
const environment = require('../../src/config/environment');

describe('Auth routes', () => {


    beforeAll(async () => {
        await db.connect(
            environment.databaseUrl,
        );
    });

    afterAll(async () => {
        await db.disconnect();
    });


    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                name: 'John Doe',
                email: `${uuid.v4()}@example.com`,
                password: 'password',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });


});

const request = require('supertest');
const app = require('../../src/index.js');
const db = require('../../src/config/database');
const environment = require('../../src/config/environment');

// integration test
describe('Auth routes', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('should register a new user', async () => {
        const response = await request(app).post('/auth/register').send({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
    });

    it('should login a user', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'johndoe@gmail.com',
            password: 'password',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
    });

    it('should refresh a user token', async () => {
        const response = await request(app).post('/auth/refresh-token').send({
            refreshToken: environment.jwtRefreshExpiration,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
    }

    );
});

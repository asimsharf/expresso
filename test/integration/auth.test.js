const request = require('supertest');
const app = require('../../src/index.js');
const db = require('../../src/config/database');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.close();
});

describe('Authentication', () => {
    let accessToken;

    test('POST /auth/signup should return 201 Created', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        expect(response.status).toBe(201);
    });

    test('POST /auth/login should return 200 OK', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'john@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        accessToken = response.body.accessToken;
    });

    test('GET /auth/me should return 200 OK', async () => {
        const response = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe('john@example.com');
    });
});
const request = require('supertest');
const app = require('../../src/index.js');
const db = require('../../src/config/database');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.close();
});

describe('User Management', () => {
    let accessToken;

    test('POST /auth/login should return 200 OK', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'admin@example.com', password: 'password' });
        expect(response.status).toBe(200);
        accessToken = response.body.accessToken;
    });

    test('GET /users should return 200 OK', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /users should return 201 Created', async () => {
        const newUser = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };
        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });

    test('GET /users/:id should return 200 OK', async () => {
        const response = await request(app)
            .get('/users/1')
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.email).toBe('jane@example.com');
    });

    test('PUT /users/:id should return 200 OK', async () => {
        const updatedUser = { name: 'Jane Smith', email: 'jane.smith@example.com' };
        const response = await request(app)
            .put('/users/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.email).toBe(updatedUser.email);
    });

    test('DELETE /users/:id should return 204 No Content', async () => {
        const response = await request(app)
            .delete('/users/1')
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(204);
    });
});
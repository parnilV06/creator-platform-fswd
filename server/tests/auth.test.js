// ✅ 1. IMPORTS
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../models/User.js';

// ✅ 2. DESCRIBE BLOCK
describe('Auth Routes', () => {

  // ✅ 3. HOOKS (SETUP + CLEANUP)

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ✅ 4. TEST CASES START HERE

  test('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  test('should fail to register with existing email', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'User',
      email: 'duplicate@example.com',
      password: '123456'
    });

    const res = await request(app).post('/api/auth/register').send({
      name: 'User2',
      email: 'duplicate@example.com',
      password: '123456'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('should fail with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Incomplete' });

    expect(res.status).toBe(400);
  });

  test('should login successfully', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'login@example.com',
      password: 'password123'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should fail login with wrong password', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'User',
      email: 'wrong@example.com',
      password: 'correct123'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrong123'
      });

    expect(res.status).toBe(401);
  });

});
const request = require('supertest');
const app = require('../job-tracker-server');
const mongoose = require('mongoose');

// Basic Server and MongoDB Connection Tests
describe('Server Running and MongoDB Connected', () => {
  let consoleSpy;

  // Before running tests, mock the console log
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // After tests, restore the original console log behavior
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  afterAll(async () => {
    await mongoose.connection.close();
});

  it('should return a 200 OK status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('should log "Connected to MongoDB" when successfully connected', async () => {
    // add a 2 second delay to allow the connection to be made
    await new Promise(resolve => setTimeout(() => resolve(), 2000));
    expect(consoleSpy).toHaveBeenCalledWith('Connected to MongoDB');
  });
});


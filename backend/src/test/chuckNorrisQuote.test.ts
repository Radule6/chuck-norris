import request from 'supertest';
import app from '../app/app';
describe('Fetching Chuck Norris Quote', () => {
  test('User logs into the system and tries to fetch a quote from the Chuck Norris API endpoint', async () => {
    const loginResponse = await request(app)
      .post('/api/user/login')
      .send({ email: 'marko.radulovic04@gmail.com', password: 'marko123' });

    const cookies = loginResponse.headers['set-cookie'];
    const response = await request(app).get('/api/chucknorris/quote').set('Cookie', cookies[0]);
    expect(response.statusCode).toBe(200);
  });
});

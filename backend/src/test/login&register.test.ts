import request from 'supertest';
import app from '../app/app';

describe('Register API', () => {
  test('User is trying to create an account with empty data', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({ firstName: '', lastName: '', email: '', password: '' });

    expect(response.status).toBe(400);
  });
  test('User is trying to create an account with already existing user email', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({ firstName: 'Marko', lastName: 'Radulovic', email: 'marko.radulovic04@gmail.com', password: '12345678' });
    expect(response.status).toBe(400);
  });

  /*  Replace with your own values for proper testing */
  // test('User is trying to create a valid account', async () => {
  //   const response = await request(app).post('/api/user/register').send({
  //     firstName: 'Pero',
  //     lastName: 'Peric',
  //     email: 'pero.peric@gmail.com',
  //     password: 'pass123',
  //   });
  //   expect(response.status).toBe(201);
  // });
});

describe('Login API', () => {
  test('User login with valid email and password', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'marko.radulovic04@gmail.com', password: 'marko123' });

    expect(response.status).toBe(200);
  });
  test('user login with invalid email and password', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'marko.radulovic@gmail.com', password: 'kfjsdalkfj' });

    expect(response.status).toBe(404);
  });

  /*  Replace with your own values for proper testing */

  // test('user login with created valid email and password but not confirmed', async () => {
  //   const response = await request(app).post('/api/user/login').send({ email: 'mr7287@rit.edu', password: 'pass123' });
  //   console.log(response);

  //   expect(response.status).toBe(500);
  // });
});

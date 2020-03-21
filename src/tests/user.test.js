/* global describe it expect beforeAll */
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from 'faker';
import app from '../server';
import config from '../config';
import typeorm from '../typeorm';

const request = supertest(app.server);

describe('/v1/auth', () => {
  beforeAll(() => typeorm());
  const user = {
    password: faker.internet.password(),
    username: faker.internet.userName(),
    nickname: faker.name.firstName(),
  };
  describe('/register', () => {
    it('password is required field', async () => {
      const res = await request
        .post('/v1/auth/register')
        .expect(400);
    });

    it('user can register account', async () => {
      const res = await request
        .post('/v1/auth/register')
        .send(user)
        .expect(201);
    });
  });
  describe('/login', () => {
    it('user can not login with wrong password', async () => {
      const res = await request
        .post('/v1/auth/login')
        .send({
          username: user.username,
          password: 'test',
        })
        .expect(400);
    });

    it('user can with correct', async () => {
      const res = await request
        .post('/v1/auth/login')
        .send({
          username: user.username,
          password: user.password,
        })
        .expect(200);
      const { token } = res.body;
      const decodedToken = jwt.decode(token);
      expect(decodedToken.username).toBe(user.username);
    });
  });
});

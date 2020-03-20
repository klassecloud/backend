/* global describe it expect beforeAll */
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import app from '../server';
import config from '../config';
import typeorm from '../typeorm';
import faker from 'faker';

const request = supertest(app.server);
const token = jwt.sign({ sub: '3cefd540-b1c9-464f-a8c6-9e27f24aeb53' }, 'test');

describe('/v1/auth', () => {
  beforeAll(() => typeorm());

  describe('/register', () => {
    it('password is required field', async () => {
      const res = await request
        .post('/v1/auth/register')
        .expect(400)
    })
    it('user can register account', async () => {
      const res = await request
        .post('/v1/auth/register')
        .send({
          password: faker.internet.password(),
          username: faker.internet.userName(),
          nickname: faker.name.firstName(),
        })
        .expect(201);
      // expect(res.body.balance).toBe('220');
    });
  });
});

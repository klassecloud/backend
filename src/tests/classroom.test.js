/* global describe it expect beforeAll */
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from 'faker';
import app from '../server';
import config from '../config';
import typeorm from '../typeorm';
import User from '../models/User';

const request = supertest(app.server);

describe('/v1/classroom', () => {
  const user = {
    password: faker.internet.password(),
    username: faker.internet.userName(),
    nickname: faker.name.firstName(),
  };
  let testToken;
  beforeAll(async () => {
    await typeorm();
    await request
      .post('/v1/auth/register')
      .send(user)
      .expect(201);
    const res = await request
      .post('/v1/auth/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200);
    const { token } = res.body;
    testToken = token;
  });

  describe('POST /', () => {
    it('user can not create classroom without being a teacher', async () => {
      const res = await request
        .post('/v1/classroom/')
        // .send(user)
        .expect(401);
    });

    it('teacher can create a classroom', async () => {
      const dbUser = await User.findOne({ username: user.username });
      dbUser.isTeacher = true;
      await dbUser.save();
      const reqBody = {
        username: user.username,
        password: user.password,
      };
      console.log(reqBody);
      const res = await request
        .post('/v1/auth/login')
        .send({
          username: user.username,
          password: user.password,
        })
        .expect(200);
      testToken = res.body.token;
      await request
        .post('/v1/classroom/')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(201);
    });
  });
});

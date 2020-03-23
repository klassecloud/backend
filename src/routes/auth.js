import Router from '@koa/router';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';

const authRouter = new Router({ prefix: '/auth' });

function comparePass(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

authRouter.post('/register', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.password === undefined) {
    return ctx.throw(Boom.badRequest('password is required'));
  }
  if (body.nickname === undefined) {
    return ctx.throw(Boom.badRequest('nickname is required'));
  }
  if (body.username === undefined) {
    return ctx.throw(Boom.badRequest('username is required'));
  }
  const account = new User();
  account.password = body.password;
  account.nickname = body.nickname;
  account.username = body.username;
  account.isTeacher = false;
  await account.save();
  ctx.body = {
    username: account.username,
    state: "Created"
  };
  ctx.status = 201;
  return next();
});


authRouter.post('/login', async (ctx, next) => {
  const { body } = ctx.request;
  const dbUser = await User.findOne({ username: body.username });
  if (dbUser === undefined || dbUser === false) {
    return ctx.throw(Boom.badRequest('Invalid Username or Password!'));
  }
  if (!comparePass(body.password, dbUser.password)) {
    return ctx.throw(Boom.badRequest('Invalid Username or Password!'));
  }
  // TODO: this need to be configurable
  const token = jwt.sign({
    username: dbUser.username,
    nickname: dbUser.nickname,
    isTeacher: dbUser.isTeacher,
    email: dbUser.email,
    id: dbUser.id,
  },
  config.jwtSecret,
  {
    expiresIn: '14d',
  });
  ctx.body = {
    id: dbUser.id,
    username: dbUser.username,
    nickname: dbUser.nickname,
    email: dbUser.email,
    token,
  };
  return next();
});

export default authRouter;

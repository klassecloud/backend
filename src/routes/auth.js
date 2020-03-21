import Router from '@koa/router';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';

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
  await account.save();
  ctx.status = 201;
  return next();
});

authRouter.post('/login', async (ctx, next) => {
  const { body } = ctx.request;
  const dbUser = await User.findOne({ username: body.username });
  const isCorrect = comparePass(body.password, dbUser.password);
  if (!isCorrect) {
    return ctx.throw(Boom.badRequest('Invalid Username or Password!'));
  }
  // TODO: this need to be configurable
  const token = jwt.sign({
    username: dbUser.username,
    nickname: dbUser.nickname,
    isTeacher: dbUser.isTeacher,
    email: dbUser.email,
    id: dbUser.id,
  }, 'TEST', {
    expiresIn: '14d',
  });
  ctx.body = {
    success: true,
    token,
  };
  return next();
});

export default authRouter;

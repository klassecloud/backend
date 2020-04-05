import Router from '@koa/router';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';
import Teacher from '../models/Teacher';

const authRouter = new Router({ prefix: '/auth' });

function comparePass(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}


authRouter.post('/register', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.isTeacherRegistration) {
    if (body.password === undefined) {
      return ctx.throw(Boom.badRequest('password is required'));
    }
    if (body.email === undefined) {
      return ctx.throw(Boom.badRequest('email is required'));
    }
    if (body.nickname === undefined) {
      return ctx.throw(Boom.badRequest('nickname is required'));
    }
    if (body.username === undefined) {
      return ctx.throw(Boom.badRequest('username is required'));
    }

    console.log(body.email);
    const teacher = new Teacher();
    teacher.username = body.username;
    teacher.nickname = body.nickname;
    teacher.email = body.email;
    teacher.password = body.password;
    teacher.isValidated = false;
    await teacher.save();
    ctx.body = {
      username: teacher.username,
      state: 'Created',
    };
    ctx.status = 201;
    return next();
  }

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
  ctx.body = {
    username: account.username,
    state: 'Created',
  };
  ctx.status = 201;
  return next();
});


authRouter.post('/login', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.isTeacherLogin) {
    const dbTeacher = await Teacher.findOne({ username: body.username });
    if (dbTeacher === undefined || dbTeacher === false) {
      return ctx.throw(Boom.badRequest('Dein Username oder Passwort ist falsch.'));
    }
    if (!comparePass(body.password, dbTeacher.password)) {
      return ctx.throw(Boom.badRequest('Dein Username oder Passwort ist falsch.'));
    }
    const token = jwt.sign({
      username: dbTeacher.username,
      nickname: dbTeacher.nickname,
      email: dbTeacher.email,
      isValidated: dbTeacher.isValidated,
      id: dbTeacher.id,
    },
    config.jwtSecret,
    {
      expiresIn: '14d',
    });
    ctx.body = {
      id: dbTeacher.id,
      username: dbTeacher.username,
      nickname: dbTeacher.nickname,
      email: dbTeacher.email,
      isValidated: dbTeacher.isValidated,
      token,
    };
    return next();
  }
  const dbUser = await User.findOne({ username: body.username });
  if (dbUser === undefined || dbUser === false) {
    return ctx.throw(Boom.badRequest('Dein Username oder Passwort ist falsch.'));
  }
  if (!comparePass(body.password, dbUser.password)) {
    return ctx.throw(Boom.badRequest('Dein Username oder Passwort ist falsch.'));
  }
  // TODO: this need to be configurable
  const token = jwt.sign({
    username: dbUser.username,
    nickname: dbUser.nickname,
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

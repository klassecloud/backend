import Router from '@koa/router';
import Boom from '@hapi/boom';
import User from '../models/User'

const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/register', async (ctx, next) => {
  const { body } = ctx.request;
  if(body.password === undefined) {
    return ctx.throw(Boom.badRequest('password is required'));
  }
  if(body.nickname === undefined) {
    return ctx.throw(Boom.badRequest('nickname is required'));
  }
  if(body.username === undefined) {
    return ctx.throw(Boom.badRequest('username is required'));
  }
  console.log(JSON.stringify(body));
  const account = new User();
  account.password = body.password;
  account.nickname = body.nickname;
  account.username = body.username;
  await account.save();
  ctx.status = 201;
  return next();
});

export default authRouter;

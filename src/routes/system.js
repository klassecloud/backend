import Router from '@koa/router';
import Boom from '@hapi/boom';
import { getConnection, ConnectionManager, Connection } from 'typeorm';
import config from '../config';


const systemRouter = new Router({ prefix: '/system' });

systemRouter.get('/healthz', async (ctx, next) => {
  try {
    await Promise.all([
      getConnection().query('SELECT 1+1 as result'),
    ]);
    ctx.body = { success: true };
  } catch (e) {
    ctx.log.error(e);
    ctx.status = 500;
    ctx.body = { success: false };
  }
  return next();
});

systemRouter.get('/healthy', (ctx) => {
  if (config.getReadyState()) {
    ctx.body = { success: true };
  } else {
    ctx.status = 500;
    ctx.body = { success: false };
  }
});

export default systemRouter;

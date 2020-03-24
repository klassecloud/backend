import Router from '@koa/router';
import { oas } from 'koa-oas3';
import { ChowError } from 'oas3-chow-chow';
import Boom from '@hapi/boom';
import * as fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';
import authRouter from './auth';
import classroomRouter from './classroom';
import config from '../config';
import restrictionRouter from './restrictionRouter';

const router = new Router({ prefix: '/v1' });

// router.use(oas({
//   file: `${__dirname}/../config/openapi.yaml`,
//   validatePaths: ['/v1'],
//   validateResponse: false,
//   errorHandler: (err, ctx) => {
//     console.log(err);
//     console.log('oas error handler');
//     if (err instanceof ChowError) {
//       const json = err.toJSON();
//       const e = Boom.badRequest(json.suggestions[0].error.trim());
//       ctx.throw(e);
//     }
//     throw err;
//   },
// }));

router.use(async (ctx, next) => {
  if (ctx.headers.authorization) {
    const token = ctx.headers.authorization.substring('Bearer '.length);
    if (!token) {
      return ctx.throw(Boom.unauthorized());
    }

    const algorithms = ['HS256'];

    try {
      ctx.user = jwt.verify(token, config.jwtSecret, { algorithms });
    } catch (e) {
      return ctx.throw(Boom.unauthorized());
    }
  }
  return next();
});

router.use(authRouter.routes());
router.use(restrictionRouter.routes());

export default router;

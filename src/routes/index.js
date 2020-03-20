import Router from '@koa/router';
import { oas } from 'koa-oas3';
import { ChowError } from 'oas3-chow-chow';
import Boom from '@hapi/boom';
import * as fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';
import authRouter from './auth';

const router = new Router({ prefix: '/v1' });
let cert;

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

// router.use(async (ctx, next) => {
//   // if (!ctx.headers.authorization) {
//   //   return ctx.throw(Boom.unauthorized());
//   // }
//   // const token = ctx.headers.authorization.substring('Bearer '.length);
//   // if (!token) {
//   //   return ctx.throw(Boom.unauthorized());
//   // }
//   // if (!cert) {
//   //   const req = await fetch('https://identity.01.helm-notifier.com/realms/master');
//   //   if (req.status !== 200) {
//   //     return ctx.throw(Boom.unauthorized());
//   //   }
//   //   const config = await req.json();
//   //   cert = `-----BEGIN PUBLIC KEY-----\n${config.public_key}\n-----END PUBLIC KEY-----`;
//   // }
//   // const algorithms = ['RS256'];
//   // if (process.env.NODE_ENV === 'test') {
//   //   algorithms.push('HS256');
//   //   cert = 'test';
//   // }

//   // try {
//   //   ctx.user = jwt.verify(token, cert, { algorithms });
//   // } catch (e) {
//   //   return ctx.throw(Boom.unauthorized());
//   // }
//   // return next();
// });


router.use(authRouter.routes());

export default router;

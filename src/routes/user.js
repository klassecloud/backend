import Router from '@koa/router';
import Boom from '@hapi/boom';
import User from '../models/User';
import UserService from '../service/UserService';

const userRouter = new Router({prefix: '/user'});

userRouter.use();

userRouter.get('/:userId/classroom', async (ctx, next) => {
  const service = new UserService();
  return service.getUserClassroom(ctx);
//  return next(ctx);
});

userRouter.get('/:userId/classroom/:classroomId/subject/:subjectId', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

userRouter.get('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

userRouter.get('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId/result', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

userRouter.post('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId/result', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

userRouter.put('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId/result', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

export default userRouter;

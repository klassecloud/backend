import Router from '@koa/router';
import Boom from '@hapi/boom';

const userRouter = new Router({prefix: '/user'});

userRouter.use();

userRouter.get('/:userId/classroom', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
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

export default userRouter;

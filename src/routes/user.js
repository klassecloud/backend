import Router from '@koa/router';
import Boom from '@hapi/boom';
import User from '../models/User';

const userRouter = new Router({prefix: '/user'});

userRouter.use();

userRouter.get('/:userId/classroom', async (ctx, next) => {
  if (ctx.user.id === undefined) {
    return ctx.throw(Boom.unauthorized());
  }
  const user = await User.findOne({ id: ctx.user.id }, { relations: ['classroom', 'classroom.teacher', 'classroom.subjects', 'classroom.subjects.teacher'] });
  if (user === undefined) {
    return ctx.throw(Boom.badRequest('The given userid is not existing'));
  }
  ctx.status = 200;
  ctx.body = {
    classroomName: user.classroom.topic,
    classroomTeacherName: user.classroom.teacher.nickname,
    pushPubKey: user.classroom.pushPublicKey,
    classroomSubjects: user.classroom.subjects,
  };
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

userRouter.post('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId/result', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

userRouter.put('/:userId/classroom/:classroomId/subject/:subjectId/task/:taskId/result', async (ctx, next) => {
  const { body } = ctx.request;

  return next();
});

export default userRouter;

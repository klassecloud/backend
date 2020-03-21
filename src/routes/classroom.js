import Router from '@koa/router';
import Boom from '@hapi/boom';
import Classroom from '../models/Classroom';

const classroomRouter = new Router({ prefix: '/classroom' });


classroomRouter.post('/', async (ctx, next) => {
  const { body } = ctx.request;
  if (ctx.user === undefined || !ctx.user.isTeacher) {
    return ctx.throw(Boom.unauthorized('You need to be a teacher'));
  }
  const room = new Classroom();
  room.teachers = [ctx.user];
  room.topic = 'test';
  await room.save();
  ctx.status = 201;
  return next();
});

export default classroomRouter;

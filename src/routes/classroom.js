import Router from '@koa/router';
import Boom from '@hapi/boom';
import Classroom from '../models/Classroom';
import User from '../models/User';
import Teacher from '../models/Teacher';


const classroomRouter = new Router({ prefix: '/classroom' });

classroomRouter.use();

classroomRouter.post('/', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.topic === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a topic'));
  }
  const room = new Classroom();
  const teacher = await Teacher.findOne({ id: ctx.user.id });
  if (!teacher.isValidated) {
    return ctx.throw(Boom.unauthorized('You need to be a validated'));
  }
  room.teacher = teacher;
  room.topic = body.topic;
  await room.save();
  ctx.status = 201;
  return next();
});

classroomRouter.post('/join', async (ctx, next) => {
  const { body } = ctx.request;
  if (ctx.user.id === undefined || body.classroom.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a userId and a classromId'));
  }
  const classroom = await Classroom.findOne({ id: body.classroom.id });
  if (classroom === false) {
    return ctx.throw(Boom.badRequest('The classroom you want to join is not existing'));
  }
  const user = await User.findOne({ id: ctx.user.id });
  if (user === false) {
    return ctx.throw(Boom.badRequest('The given userid is not existing'));
  }
  user.classroom = classroom;
  await user.save();
  ctx.status = 202;
  return next();
});

classroomRouter.get('/get/byUserId', async (ctx, next) => {
  if (ctx.user.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a userId'));
  }
  const user = await User.findOne({ id: ctx.user.id }, { relations: ['classroom', 'classroom.teacher', 'classroom.subjects'] });
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


export default classroomRouter;

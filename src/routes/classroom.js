import Router from '@koa/router';
import Boom from '@hapi/boom';
import Classroom from '../models/Classroom';
import User from '../models/User';
import Teacher from '../models/Teacher';
import Subject from '../models/Subject';
import Conversation from '../models/Conversation';


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

classroomRouter.post('/:classroomId/subject', async (ctx, next) => {
  const { body } = ctx.request;
  const teacher = await Teacher.findOne({ id: ctx.user.id });
  if (teacher === undefined || !teacher.isValidated) {
    return ctx.throw(Boom.unauthorized('You are not a teacher or not validated'));
  }
  const room = await Classroom.findOne({ id: ctx.params.classroomId }, { relations: ['subjects'] });
  const subjectTeacher = await Teacher.findOne({ id: body.teacherId });
  const subject = new Subject();
  const conversation = new Conversation();
  subject.name = body.subject.name;
  subject.teacher = subjectTeacher;
  subject.description = body.subject.description;
  subject.conversation = conversation;
  room.subjects.push(subject);
  await room.save();
  ctx.status = 200;
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

export default classroomRouter;

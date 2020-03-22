import Router from '@koa/router';
import Boom from '@hapi/boom';
import Classroom from '../models/Classroom';
import User from '../models/User';
import Teacher from '../models/Teacher';

const classroomRouter = new Router({ prefix: '/classroom' });


classroomRouter.post('/', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.topic === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a topic'));
  }
  const room = new Classroom();
  const teacher = await Teacher.findOne({id: body.user.id});
  if (!teacher.isValidated) {
    return ctx.throw(Boom.unauthorized('You need to be a validated'));
  }
  room.teachers = [teacher];
  room.topic = body.topic;
  await room.save();
  ctx.status = 201;
  return next();
});

classroomRouter.post('/join', async (ctx, next) => {
  const {body} = ctx.request;
  if (body.user.id === undefined || body.classroom.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a userId and a classromId'));
  }
  const classroom = await Classroom.findOne({id: body.classroom.id}, {relations:  ['teachers','users']});
  if (classroom === false) {
    return ctx.throw(Boom.badRequest('The classroom you want to join is not existing'));
  }
  const user = await User.findOne({id: body.user.id}, {relations: ['classrooms']});
  if (user === false) {
    return ctx.throw(Boom.badRequest('The given userid is not existing'));
  }
  classroom.users.push(user);
  await classroom.save();
  ctx.status = 202;
  return next();
});

classroomRouter.get('/get/byUserId', async (ctx, next) => {
  const {body} = ctx.request;
  if (body.user.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a userId'));
  }
  const user = await User.findOne({id: body.user.id}, {relations: ['classrooms']});
  if (user === false){
    return ctx.throw(Boom.badRequest('The given userid is not existing'));
  }
  ctx.status = 200;
  ctx.body = user.classrooms;
  return next();
});

export default classroomRouter;

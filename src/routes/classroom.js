import Router from '@koa/router';
import Boom from '@hapi/boom';
import Classroom from '../models/Classroom';
import User from '../models/User';


const classroomRouter = new Router({ prefix: '/classroom' });

classroomRouter.use()

classroomRouter.post('/', async (ctx, next) => {
  const { body } = ctx.request;
  if (body.topic === undefined) {
    return ctx.throw(Boom.badRequest('You need to define a topic'));
  }
  const room = new Classroom();
  const user = await User.findOne({id: ctx.user.id});
  if (!user.isTeacher) {
    return ctx.throw(Boom.unauthorized('You need to be a validated'));
  }
  room.teacherId = user.id;
  room.topic = body.topic;
  await room.save();
  ctx.status = 201;
  return next();
});

classroomRouter.post('/join', async (ctx, next) => {
  const {body} = ctx.request;
  if (body.user.id === undefined || body.classroom.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define an userId and a classroomId'));
  }
  const classroom = await Classroom.findOne({id: body.classroom.id}, {relations:  ['users']});
  if (classroom === false) {
    return ctx.throw(Boom.badRequest('The classroom you want to join doesnt exist'));
  }
  const user = await User.findOne({id: body.user.id}, {relations: ['classrooms']});
  if (user === false) {
    return ctx.throw(Boom.badRequest('The given userId doesnt exist'));
  }
  console.log(classroom);
  classroom.users.push(user);
  await classroom.save();
  ctx.status = 202;
  return next();
});

classroomRouter.get('/get/byUserId', async (ctx, next) => {
  if (ctx.user.id === undefined) {
    return ctx.throw(Boom.badRequest('You need to define an userId'));
  }
  const user = await User.findOne({id: ctx.user.id}, {relations: ['classrooms']});
  if (user === undefined){
    return ctx.throw(Boom.badRequest('The given userId doesnt existing'));
  }
  ctx.status = 200;
  ctx.body = user.classrooms;
  return next();
});


export default classroomRouter;

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

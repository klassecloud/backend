import Router from '@koa/router';
import UserService from '../service/userService';
import TaskService from '../service/taskService';

const userRouter = new Router({prefix: '/user'});
const userService = new UserService();
const taskService = new TaskService();
userRouter.use();

userRouter.get('/:userId/classroom', async (ctx, next) => {
  return userService.getUserClassroom(ctx, next);
});

userRouter.get('/:userId/classroom/:classroomId/subject/:subjectId', async (ctx, next) => {
  return taskService.getSubjectTasks(ctx, next);
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
  return userService.updateUser(ctx, next);
});

export default userRouter;

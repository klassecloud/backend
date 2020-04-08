import Router from '@koa/router';
import ClassroomService from '../service/classroomService';
import TaskService from '../service/taskService';

const teacherRouter = new Router({prefix: '/teacher'});
const classroomService = new ClassroomService();
const taskService = new TaskService();
teacherRouter.use();

teacherRouter.post('/:teacherId/classroom', async (ctx, next) => {
  return classroomService.createClassroom(ctx, next);
});

teacherRouter.get('/:teacherId/classroom', async (ctx, next) => {

  return next();
});

teacherRouter.get('/:teacherId/classroom/:classroomId/subject/:subjectId', async (ctx, next) => {

  return next();
});

teacherRouter.post('/:teacherId/classroom/:classroomId/subject', async (ctx, next) => {
  return classroomService.createSubject(ctx, next);
});

teacherRouter.post('/:teacherId/classroom/:classroomId/subject/:subjectId/task', async (ctx, next ) => {
  return taskService.createTask(ctx, next);
});

teacherRouter.get('/:teacherId/classroom/:classroomId/subject/:subjectId/task/:taskId', async (ctx, next) => {

  return next();
});

teacherRouter.get('/teacherId/classroom/:classroomId/subject/:subjectId/task/:taskId/result/:resultId', async (ctx, next) => {

  return next();
});


export default teacherRouter;

import Router from '@koa/router';

const teacherRouter = new Router({prefix: '/teacher'});

teacherRouter.use();

teacherRouter.post('/:teacherId/classroom', async (ctx, next) => {

  return next();
});

teacherRouter.get('/:teacherId/classroom', async (ctx, next) => {

  return next();
});

teacherRouter.get('/:teacherId/classroom/:classroomId/subject/:subjectId', async (ctx, next) => {

  return next();
});

teacherRouter.post('/:teacherId/classroom/:classroomId/subject', async (ctx, next) => {

  return next();
});

teacherRouter.post('/:teacherId/classroom/:classroomId/subject/:subjectId/task', async (ctx, next ) => {

  return next();
});

teacherRouter.get('/:teacherId/classroom/:classroomId/subject/:subjectId/task/:taskId', async (ctx, next) => {

  return next();
});

teacherRouter.get('/teacherId/classroom/:classroomId/subject/:subjectId/task/:taskId/result/:resultId', async (ctx, next) => {

  return next();
});


export default teacherRouter;

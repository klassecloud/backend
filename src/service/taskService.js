import Boom from '@hapi/boom';
import Subject from '../models/Subject';
import Task from '../models/Task';
import File from '../models/File';

export default class TaskService {
  async createTask(ctx, next) {
    const { body } = ctx.request;
    if (!ctx.user.isValidated) {
      return ctx.throw(Boom.unauthorized('You are not a teacher or not validated'));
    }
    const subject = await Subject.findOne({ id: body.subjectId }, { relations: ['tasks'] });
    if (subject === undefined) {
      return ctx.throw(Boom.notFound('The given subject is not existing'));
    }
    const files = new Array();

    body.files.forEach((taskfile) => {
      const file = new File();
      file.title = taskfile.title;
      file.alt = taskfile.alt;
      file.content = taskfile.content;
      file.isCompressed = taskfile.isCompressed;
      file.mimetype = taskfile.mimetype;
      files.push(file);
    });

    const task = new Task();
    task.title = body.title;
    task.content = body.content;
    task.startDate = body.startDate;
    task.dueDate = body.dueDate;
    task.files = files;

    subject.tasks.push(task);
    await subject.save();
    console.log(subject);
    ctx.status = 201;
    return next();
  }

  async updateTask(ctx, next) {
    const { body } = ctx.request;
    if (!ctx.user.isValidated) {
      return ctx.throw(Boom.unauthorized('You are not a teacher or not validated'));
    }
    const task = await Task.findOne({ id: body.subjectId }, {  relations: ['files'] });
    if (task === undefined) {
      return ctx.throw(Boom.notFound('The given subject is not existing'));
    }
    const files = new Array();

    body.files.forEach((taskfile) => {
      const file = new File();
      file.title = taskfile.title;
      file.alt = taskfile.alt;
      file.content = taskfile.content;
      file.isCompressed = taskfile.isCompressed;
      file.mimetype = taskfile.mimetype;
      files.push(file);
    });

    task.title = body.title;
    task.content = body.content;
    task.startDate = body.startDate;
    task.dueDate = body.dueDate;
    task.files = files;

    await task.save();
    ctx.status = 201;

    return next();
  }

  async getSubjectTasks(ctx, next) {
    const subject = await Subject.findOne({id: ctx.params.subjectId}, {relations: ['tasks', 'tasks.files']});
    ctx.body = subject;
    return next();
  }
}

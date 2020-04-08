import Boom from '@hapi/boom';
import Teacher from '../models/Teacher';
import Classroom from '../models/Classroom';
import Subject from '../models/Subject';
import Conversation from '../models/Conversation';

export default class ClassroomService {
  async createSubject(ctx, next) {
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
  }

  async createClassroom(ctx, next) {
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
  }
}

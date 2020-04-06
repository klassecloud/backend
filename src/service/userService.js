import Boom from '@hapi/boom';
import User from '../models/User';

export default class userService {

  async getUserClassroom(ctx) {
    if (ctx.user.id === undefined) {
      return ctx.throw(Boom.unauthorized());
    }
    const user = await User.findOne({ id: ctx.user.id }, { relations: ['classroom', 'classroom.teacher', 'classroom.subjects', 'classroom.subjects.teacher'] });
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
    return ctx;
  }
}

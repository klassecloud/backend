import Boom from '@hapi/boom';
import User from '../models/User';
import UserClassroom from '../models/view/userClassroom';
import UserSubject from '../models/view/userSubject';

export default class UserService {

  async getUserClassroom(ctx, next) {
    if (ctx.user.id === undefined) {
      return ctx.throw(Boom.unauthorized());
    }
    const user = await User.findOne({ id: ctx.user.id }, { relations: ['classroom', 'classroom.teacher', 'classroom.subjects', 'classroom.subjects.teacher'] });
    if (user === undefined) {
      return ctx.throw(Boom.badRequest('The given userid is not existing'));
    }

    const output = new UserClassroom();
    output.userClassroomId = user.classroom.id;
    output.classroomName = user.classroom.topic;
    output.classroomPushKey = user.classroom.pushPublicKey;
    output.classroomTeacherName = user.classroom.teacher.nickname;
    output.classroomSubjects = new Array();

    user.classroom.subjects.forEach(subject => {
      const userSubject = new UserSubject();
      userSubject.subjectId = subject.id;
      userSubject.subjectName = subject.name;
      userSubject.subjectTeacherName = subject.teacher.nickname;
      userSubject.subjectDescription = subject.description;

      output.classroomSubjects.push(userSubject);
    });

    ctx.status = 200;
    ctx.body = output;
    return next();
  }
}

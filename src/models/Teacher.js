import {
  AfterLoad,
  BaseEntity, BeforeInsert, BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Classroom from './Classroom';
import bcrypt from 'bcryptjs';
import School from './School';
import Conversation from './Conversation';
import Subject from './Subject';


@Entity()
export default class Teacher extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  @Unique()
  username = undefined;

  @Column('varchar')
  nickname = undefined;

  @Column('varchar')
  password = undefined;

  @Column('varchar')
  @Unique()
  email = undefined;

  @Column('boolean')
  isValidated = undefined;

  @ManyToMany(type => School, school => school.teachers)
  @JoinTable()
  schools = undefined;

  @OneToMany(type => Classroom, classroom => classroom.teacher)
  classrooms = undefined;

  @OneToMany(type => Conversation, conversation => conversation.teacher)
  conversations = undefined;

  @OneToMany(type => Subject, subject => subject.teacher)
  subjects = undefined;


  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.tempPassword !== this.password) {
      const salt = bcrypt.genSaltSync();
      const password = bcrypt.hashSync(this.password, salt);
      this.password = password;
    }
  }

}

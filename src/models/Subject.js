import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn, ManyToMany,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Classroom from './Classroom';
import Conversation from './Conversation';
import Task from './Task';
import Teacher from './Teacher';

@Entity()
export default class Subject extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  name= undefined;

  @Column('varchar')
  classroomId = undefined;

  @Column('varchar')
  teacherId = undefined;

  @Column({
    type: 'varchar',
    nullable: true
  })
  description = undefined;

  @ManyToOne(type => Classroom, classroom => classroom.subjects)
  @JoinColumn({name: 'classroomId'})
  classroom = undefined;

  @ManyToOne(type => Teacher, teacher => teacher.subjects)
  @JoinColumn({name: 'teacherId'})
  teacher = undefined;

  @OneToOne(type => Conversation)
  @JoinColumn()
  conversation = undefined;

  @OneToMany(type => Task, task => task.subject)
  tasks = undefined;

}

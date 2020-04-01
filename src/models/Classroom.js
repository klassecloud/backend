import {
  Entity,
  BaseEntity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from './User';
import Teacher from './Teacher';
import Subject from './Subject';

@Entity()
export default class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  topic = undefined;

  @Column('varchar')
  teacherId = undefined;

  @OneToMany(type => User, user => user.classroom)
  users = undefined;

  @ManyToOne(type => Teacher, teacher => teacher.classrooms)
  @JoinColumn({name: 'teacherId'})
  teacher = undefined;

  @Column({
    type: 'varchar',
    nullable: true
  })
  pushPrivateKey = undefined;

  @Column({
    type: 'varchar',
    nullable: true }
  )
  pushPublicKey = undefined;

  @OneToMany(type => Subject, subject => subject.classroom)
  subjects = undefined;
}

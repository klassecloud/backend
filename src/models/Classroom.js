import {
  Entity, BaseEntity, ManyToMany, JoinTable, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from './User';
import Teacher from './Teacher';

@Entity()
export default class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  topic = undefined;

  @ManyToMany(type => Teacher, { cascade: true })
  @JoinTable()
  teachers = undefined;

  @ManyToMany(type => User, user => user.classrooms)
  @JoinTable()
  users = undefined;
}

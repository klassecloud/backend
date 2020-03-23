import {
  Entity, BaseEntity, ManyToMany, JoinTable, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

@Entity()
export default class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  topic = undefined;

  @Column('varchar')
  teacherId = undefined;

  @ManyToMany(type => User, user => user.classrooms)
  @JoinTable()
  users = undefined;
}

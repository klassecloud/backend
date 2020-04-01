import {
  BaseEntity,
  Entity, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Teacher from './Teacher';
import User from './User';
import Message from './Message';


@Entity()
export default class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @ManyToOne(type => Teacher, teacher => teacher.conversations)
  teacher = undefined;

  @OneToMany(type => Message, message => message.conversation)
  messages = undefined;

  @ManyToMany(type => User, user => user.conversations)
  @JoinTable()
  users = undefined;
}
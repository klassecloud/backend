import {
  BaseEntity, Column,
  Entity, JoinColumn, JoinTable,
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

  @Column({
    type: 'varchar',
    nullable: true
  })
  teacherId = undefined;

  @ManyToOne(type => Teacher, teacher => teacher.conversations)
  @JoinColumn({name: 'teacherId'})
  teacher = undefined;

  @OneToMany(type => Message, message => message.conversation)
  messages = undefined;

  @ManyToMany(type => User, user => user.conversations)
  @JoinTable()
  users = undefined;
}

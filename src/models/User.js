import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany, JoinTable, Unique, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import Classroom from './Classroom';
import Conversation from './Conversation';
import Result from './Result';
// const bcrypt = require('bcryptjs');


@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  @Unique()
  username = undefined;

  @Column('varchar')
  nickname = undefined;

  @Column('varchar')
  password = undefined;

  @Column({
    type: 'varchar',
    nullable: true
  })
  classroomId = undefined;

  @ManyToOne(type => Classroom, classroom => classroom.users)
  @JoinColumn({name: 'classroomId'})
  classroom = undefined;

  @ManyToMany(type => Conversation, conversation => conversation.users)
  conversations = undefined;

  @OneToMany(type => Result, result => result.user)
  results = undefined;

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

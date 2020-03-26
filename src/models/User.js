import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany, JoinTable, Unique,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import Classroom from './Classroom';
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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email = undefined;

  @Column('varchar')
  password = undefined;

  @Column('boolean')
  isTeacher = undefined;

  @ManyToMany(type => Classroom, classroom => classroom.users)
  classrooms = undefined;

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

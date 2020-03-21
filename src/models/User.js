import {
  Entity, BeforeInsert, BeforeUpdate, AfterLoad, BaseEntity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import isSANB from 'is-string-and-not-blank';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';// const bcrypt = require('bcryptjs');

import faker from 'faker';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  username = undefined;

  @Column('varchar')
  nickname = undefined;

  @Column('bool')
  isTeacher = false;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email = undefined;

  @Column('varchar')
  password = undefined;

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

import {
  Entity, BeforeInsert, BeforeUpdate, AfterLoad, BaseEntity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';// const bcrypt = require('bcryptjs');

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  name = undefined;
}





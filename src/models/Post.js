import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany, JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import Category from './Category';
// const bcrypt = require('bcryptjs');

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

 @Column('varchar')
  title = undefined;

 @Column('varchar')
  text = undefined;

  @OneToMany(type => Category, category => category.name , {cascade: true})
  @JoinTable()
  categories = undefined;
}


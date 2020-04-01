
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import Result from './Result';

@Entity()
export default class File extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  title = undefined;

  @Column('varchar')
  alt = undefined;

  @Column('bytea')
  content = undefined;

  @Column('boolean')
  isCompressed = undefined;

  @Column('varchar')
  mimetype = undefined

  @Column({
    type: 'varchar',
    nullable: true
  })
  resultId = undefined;

  @ManyToMany(type => Task, task => task.files)
  tasks = undefined;

  @ManyToOne(type => Result, result => result.files)
  @JoinColumn({name: 'resultId'})
  result = undefined;
}

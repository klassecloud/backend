import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import File from './File';
import Result from './Result';
import Subject from './Subject';

@Entity()
export default class Task extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  title = undefined

  @Column({
    type: 'varchar',
    nullable: true
  })
  content = undefined;

  @Column({
    type: 'timestamp',
    nullable: true
  })
  dueDate = undefined

  @Column({
    type: 'timestamp',
    nullable: true
  })
  startDate = undefined;

  @ManyToMany(type => File, file => file.tasks)
  @JoinTable()
  files = undefined;

  @OneToMany(type => Result, result => result.task)
  results = undefined;

  @ManyToOne(type => Subject, subject => subject.tasks)
  subject = undefined;

}

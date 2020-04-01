import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import File from './File';
import User from './User';
import Task from './Task';

@Entity()
export default class Result extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  title = undefined;

  @Column({
    type: 'varchar',
    nullable: true
  })
  comment = undefined;

  @Column('varchar')
  state = undefined;

  @ManyToOne(type => Task, task => task.results)
  task = undefined;

  @OneToMany(type => File, file => file.result)
  files = undefined;

  @ManyToOne(type => User, user => user.results)
  user = undefined;

}

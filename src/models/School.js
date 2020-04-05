import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Teacher from './Teacher';


@Entity()
export default class School extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column('varchar')
  name = undefined;

  @Column('varchar')
  street = undefined;

  @Column('int8')
  zip = undefined;

  @Column('varchar')
  city = undefined;

  @Column('int8')
  schoolId = undefined;

  @ManyToMany(type => Teacher, teacher => teacher.schools)
  teachers = undefined;
}

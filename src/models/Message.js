import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Message extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4()

  @Column('varchar')
  content = undefined;

  @Column('timestamp')
  timestamp = undefined;


}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Conversation from './Conversation';

@Entity()
export default class Message extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4()

  @Column('varchar')
  content = undefined;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  timestamp = undefined;

  @Column('varchar')
  sender = undefined;

  @Column('varchar')
  conversationId = undefined;

  @ManyToOne(type => Conversation, conversation => conversation.messages)
  @JoinColumn({name: 'conversationId'})
  conversation = undefined;


}

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Picture } from './picture.entity';
import { Message } from './message.entity';
import { Tag } from './tag.entity';
import { Chat } from './chat.entity';
import { Like } from './like.entity';
import { Alert } from './alert.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @Column({ length: 16 })
  password: string;

  @Column({ default: true })
  email_checked: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  gender: string | null;

  @Column({ type: 'timestamp', nullable: true })
  last_logined_at: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'int', default: 0 })
  token: number;

  @Column({ length: 40, default: '' })
  display_name: string;

  @Column({ type: 'text', default: '' })
  status_message: string;

  @OneToMany(() => Picture, (picture) => picture.user)
  pictures: Picture[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => Like, (like) => like.sender)
  sent_likes: Like[];

  @OneToMany(() => Like, (like) => like.receiver)
  received_likes: Like[];

  @OneToMany(() => Alert, (alert) => alert.user)
  alerts: Alert[];

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

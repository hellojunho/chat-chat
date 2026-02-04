import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @ManyToOne(() => User)
  other_user: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  file: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  sended_at: Date;
}

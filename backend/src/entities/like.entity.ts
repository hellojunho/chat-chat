import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity('likes')
@Unique(['sender', 'receiver'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sent_likes)
  sender: User;

  @ManyToOne(() => User, (user) => user.received_likes)
  receiver: User;

  @Column({ default: false })
  is_consumed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

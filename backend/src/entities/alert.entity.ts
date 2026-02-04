import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum AlertType {
  LikeReceived = 'like_received',
  ChatRequest = 'chat_request',
  ChatAccepted = 'chat_accepted'
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.alerts)
  user!: User;

  @Column({ type: 'enum', enum: AlertType })
  type!: AlertType;

  @Column({ type: 'text' })
  message!: string;

  @Column({ default: false })
  is_read!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}

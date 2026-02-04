import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pictures)
  user: User;

  @Column()
  picture: string;

  @CreateDateColumn({ type: 'timestamp' })
  registered_at: Date;

  @Column({ default: false })
  is_deleted: boolean;
}

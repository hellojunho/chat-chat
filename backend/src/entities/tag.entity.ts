import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { TagType } from './tag.enum';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @Column({ type: 'enum', enum: TagType })
  tag: TagType;
}

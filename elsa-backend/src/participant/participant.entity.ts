import { Answer } from '../answer/answer.entity';
import { Quiz } from '../quiz/quiz.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Participants')
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Index()
  @ManyToOne(() => Quiz, (quiz) => quiz.participants)
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.participant)
  answers: Answer[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

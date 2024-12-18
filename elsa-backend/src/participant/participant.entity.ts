import { QuizSession } from '../quiz-session/quiz-session.entity';
import { Answer } from '../answer/answer.entity';
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

  @Column()
  quizSessionId: number;

  @Index()
  @ManyToOne(() => QuizSession, (quizSession) => quizSession.participants)
  @JoinColumn({ name: 'quizSessionId' })
  quizSession: QuizSession;

  @OneToMany(() => Answer, (answer) => answer.participant)
  answers: Answer[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

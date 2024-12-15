  import { Participant } from '../participant/participant.entity';
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

@Entity('QuizSessions')
export class QuizSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionName: string;

  @Column()
  quizId: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizSessions)
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column('jsonb')
  quizState: any;

  @OneToMany(() => Participant, (participant) => participant.quizSession)
  participants: Participant[];

  @Column({ default: false })
  isDeleted: boolean;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

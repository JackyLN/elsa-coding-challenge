import { AnswerResult } from '../_shared/enum/answer-result.enum';
import { Participant } from '../participant/participant.entity';
import { Question } from '../question/question.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Answers')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Index()
  @ManyToOne(() => Participant, (participant) => participant.answers)
  @JoinColumn({ name: 'participantId' })
  participant: Participant;

  @Column({ type: 'simple-array', nullable: true })
  selectedOption: number[];

  @Column({ type: 'enum', enum: AnswerResult, nullable: true })
  result: AnswerResult;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

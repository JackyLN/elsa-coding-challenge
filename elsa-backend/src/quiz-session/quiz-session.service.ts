import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSession } from './quiz-session.entity';
import { Repository } from 'typeorm';
import { QuizSessionCreateParamsDto } from './dto/quiz-session-create.params.dto';
import { Quiz } from 'src/quiz/quiz.entity';
import { Question } from 'src/question/question.entity';
import { toListQuestionResponseDto } from 'src/question/question.mapper';

@Injectable()
export class QuizSessionService {
  constructor(
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getAllQuizSessions(): Promise<any> {
    return await this.quizRepository.find();
  }

  async getLastestQuizSessionByQuizId(quizId: number): Promise<any> {
    return await this.quizSessionRepository.findOne({
      where: {
        quizId,
        isDeleted: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async createQuizSession(
    quizSessionCreateParamsDto: QuizSessionCreateParamsDto,
  ): Promise<any> {
    const { sessionName, quizId } = quizSessionCreateParamsDto;
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId, isDeleted: false },
    });
    const questions = await this.questionRepository.find({
      where: { quizId, isDeleted: false },
      order: { order: 'ASC' },
    });

    const quizSession = new QuizSession();
    quizSession.sessionName = sessionName;
    quizSession.quiz = quiz;
    quizSession.quizState = questions;

    return await this.quizSessionRepository.save(quizSession);
  }

  async getAvailableQuizSession(): Promise<any> {
    const subQuery = this.quizSessionRepository
      .createQueryBuilder('sub')
      .select('MAX(sub.id)', 'latestId')
      .where('sub.isDeleted = :isDeleted', { isDeleted: false })
      .groupBy('sub.quizId');

    const latestRecords = await this.quizSessionRepository
      .createQueryBuilder('q')
      .select('q.id, q.quizId, q.sessionName, quiz.name, quiz.description')
      .innerJoin(
        `(${subQuery.getQuery()})`,
        'latest',
        'q.id = latest."latestId"',
      )
      .leftJoin('q.quiz', 'quiz')
      .setParameters(subQuery.getParameters())
      .orderBy('q.quizId', 'ASC')
      .getRawMany();
    return latestRecords;
  }

  async getQuizSessionById(sessionId: number): Promise<any> {
    return await this.quizSessionRepository.findOne({
      select: ['id', 'quiz', 'sessionName'],
      where: { id: sessionId, isDeleted: false },
      relations: ['quiz'],
    });
  }

  async getQuizSessionQuestionsBySessionId(sessionId: number): Promise<any> {
    const quizSession = await this.quizSessionRepository.findOne({
      where: { id: sessionId, isDeleted: false },
      relations: ['quiz'],
    });

    return toListQuestionResponseDto(quizSession.quizState, false);
  }
}

import { Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getQuestionByQuizId(quizId: number): Promise<any> {
    return await this.questionRepository.find({
      where: { quizId },
      order: { order: 'ASC' },
    });
  }
}

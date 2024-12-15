import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuizzes(): Promise<any> {
    return await this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<any> {
    return await this.quizRepository.findOne({ where: { id: id } });
  }
}

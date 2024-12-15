import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { QuestionService } from 'src/question/question.service';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
  ) {}

  @Get()
  getAllQuizzes(): Promise<any> {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Quiz Id' })
  getQuizById(@Param('id') id: string): Promise<any> {
    const quizId = parseInt(id, 10) || 0;
    return this.quizService.getQuizById(quizId);
  }

  @Get(':id/questions')
  @ApiParam({ name: 'id', description: 'Quiz Id' })
  getQuestionByQuizId(@Param('id') id: string): Promise<any> {
    const quizId = parseInt(id, 10) || 0;
    return this.questionService.getQuestionByQuizId(quizId)
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionCreateParamsDto } from './dto/quiz-session-create.params.dto';

@ApiTags('Quiz Session')
@Controller('session')
export class QuizSessionController {
  constructor(private quizSessionService: QuizSessionService) {}

  @Post()
  createQuizSession(
    @Body() quizSessionCreateParamsDto: QuizSessionCreateParamsDto,
  ): Promise<any> {
    try {
      return this.quizSessionService.createQuizSession(
        quizSessionCreateParamsDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  getAvailableQuizSession(): Promise<any> {
    try {
      return this.quizSessionService.getAvailableQuizSession();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Quiz Session Id' })
  getQuizSessionById(@Param('id') id: string): Promise<any> {
    try {
      const sessionId = parseInt(id, 10) || 0;
      return this.quizSessionService.getQuizSessionById(sessionId);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id/questions')
  @ApiParam({ name: 'id', description: 'Quiz Session Id' })
  getQuizSessionQuestionsBySessionId(@Param('id') id: string): Promise<any> {
    try {
      const sessionId = parseInt(id, 10) || 0;
      return this.quizSessionService.getQuizSessionQuestionsBySessionId(sessionId);
    } catch (error) {
      console.log(error);
    }
  }
}

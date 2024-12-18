import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerCreateParamsDto } from './dto/answer-create.params.dto';

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  createAnswer(
    @Body() answerCreateParamsDto: AnswerCreateParamsDto,
  ): Promise<any> {
    try {
      return this.answerService.createAnswer(answerCreateParamsDto);
    } catch (error) {
      console.log(error);
    }
  }
}

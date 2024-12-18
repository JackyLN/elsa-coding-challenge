import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
import { ParticipantCreateParamsDto } from './dto/participant-create.params.dto';

@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Post()
  joinQuizGame(
    @Body() participantCreateParamsDto: ParticipantCreateParamsDto,
  ): Promise<any> {
    try {
      return this.participantService.joinQuizGame(participantCreateParamsDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  getAllParticipantByQuizSessionId(
    @Query('quizId') quizId: string,
  ): Promise<any> {
    try {
      const _quizId = parseInt(quizId, 10) || 0;
      return this.participantService.getAllParticipantByQuizSessionId(_quizId);
    } catch (error) {
      console.log(error);
    }
  }
}

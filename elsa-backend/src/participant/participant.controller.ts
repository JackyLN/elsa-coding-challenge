import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(){}

  @Post()
  joinQuizGame
}

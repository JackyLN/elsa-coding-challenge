import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { Repository } from 'typeorm';
import { ParticipantCreateParamsDto } from './dto/participant-create.params.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  async joinQuizGame(
    participantCreateParamsDto: ParticipantCreateParamsDto,
  ): Promise<any> {
    const { name, email, quizSessionId } = participantCreateParamsDto;
    const participant = new Participant();
    participant.name = name;
    participant.email = email;
    participant.quizSessionId = quizSessionId;
    return await this.participantRepository.save(participant);
  }

  async getAllParticipantByQuizSessionId(quizSessionId: number): Promise<any> {
    return await this.participantRepository.find({
      where: { quizSessionId, isDeleted: false },
    });
  }
}

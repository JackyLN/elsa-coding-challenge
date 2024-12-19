import { Answer } from './../answer/answer.entity';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async calculateLeaderboard(sessionId: number): Promise<any> {
    console.log('sessionId', sessionId);
    const leaderboard = await this.answerRepository
      .createQueryBuilder('answer')
      .select('answer.participantId', 'participantId')
      .addSelect('COUNT(answer.id)', 'totalAnswers')
      .addSelect(
        "SUM(CASE WHEN answer.result = '1' THEN 1 ELSE 0 END)",
        'correctAnswers',
      )

      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('p.id')
          .from('Participants', 'p')
          .where('p."quizSessionId" = :sessionId')
          .getQuery();
        return `answer.participantId IN ${subQuery}`;
      })
      .setParameter('sessionId', sessionId) // Bind the parameter
      .andWhere('answer.isDeleted = false')
      .leftJoin('answer.participant', 'participant')
      .addSelect('participant.name, participant.email')
      .groupBy('answer.participantId, participant.name, participant.email')
      .orderBy('"correctAnswers"', 'DESC')
      .getRawMany();

    return leaderboard.map((entry, index) => ({
      rank: index + 1,
      id: entry.participantId,
      name: `${entry.name} - (email: ${entry.email})`,
      score: entry.correctAnswers,
    }));
  }

  async updateLeaderboard(sessionId: number, newAnswer: Answer) {
    const leaderboard = await this.calculateLeaderboard(sessionId);

    this.eventEmitter.emit('leaderboard.update', {
      sessionId: sessionId.toString(),
      leaderboard,
    });
  }
}

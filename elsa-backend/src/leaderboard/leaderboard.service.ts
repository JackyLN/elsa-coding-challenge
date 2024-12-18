import { Answer } from './../answer/answer.entity';
import { Injectable } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService {
  constructor(
    private readonly leaderboardGateway: LeaderboardGateway,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async calculateLeaderboard(sessionId: number): Promise<any> {
    console.log('sessionId', sessionId);
    const subQuery = this.answerRepository
      .createQueryBuilder('p')
      .select('p.id')
      .from('Participants', 'p')
      .where('p."quizSessionId" = :sessionId', { sessionId })
      .getQuery();

    const leaderboard = await this.answerRepository
      .createQueryBuilder('answer')
      .select('answer.participantId', 'participantId')
      .addSelect('COUNT(answer.id)', 'totalAnswers')
      .addSelect(
        'SUM(CASE WHEN answer.result = 1 THEN 1 ELSE 0 END)',
        'correctAnswers',
      )
      .where(`answer.participantId IN ${subQuery}`)
      .andWhere('answer.isDeleted = false')
      .setParameter('sessionId', sessionId) // Explicitly bind the parameter
      .groupBy('answer.participantId')
      .orderBy('correctAnswers', 'DESC')
      .getRawMany();

    return leaderboard;
  }

  async updateLeaderboard(sessionId: number, newAnswer: Answer) {
    const leaderboard = await this.calculateLeaderboard(sessionId);
    this.leaderboardGateway.emitLeaderboardUpdate(
      sessionId.toString(),
      leaderboard,
    );
  }
}

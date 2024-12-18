import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get('session/:sessionId')
  @ApiParam({ name: 'sessionId', description: 'Quiz Session Id' })
  getLeaderboardBySessionId(
    @Param('sessionId') sessionId: string,
  ): Promise<any> {
    try {
      const _sessionId = parseInt(sessionId, 10) || 0;
      return this.leaderboardService.calculateLeaderboard(_sessionId);
    } catch (error) {
      console.log(error);
    }
  }
}

import { OnEvent } from '@nestjs/event-emitter';
import { LeaderboardService } from './leaderboard.service';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/socket',
  cors: {
    origin: '*',
  },
})
export class LeaderboardGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @WebSocketServer() server: Server;

  private activeUsers = 0;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.activeUsers++;
    this.server.emit('activeUsers', this.activeUsers);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.activeUsers--;
    this.server.emit('activeUsers', this.activeUsers);
  }

  @SubscribeMessage('joinLeaderboard')
  async handleJoinLeaderboard(client: Socket, payload: { sessionId: string }) {
    console.log(`Client joined leaderboard for session: ${payload.sessionId}`);
    client.join(payload.sessionId); // Join a room specific to the session

    // Fetch and emit the current leaderboard to the user
    const leaderboard = await this.leaderboardService.calculateLeaderboard(
      Number(payload.sessionId),
    );
    client.emit('leaderboardUpdate', leaderboard);
  }

  @OnEvent('leaderboard.update')
  handleLeaderboardUpdate(payload: { sessionId: string; leaderboard: any }) {
    this.server
      .to(payload.sessionId)
      .emit('leaderboardUpdate', payload.leaderboard);
  }
}

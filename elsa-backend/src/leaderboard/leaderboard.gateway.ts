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
  handleJoinLeaderboard(client: Socket, payload: { sessionId: string }) {
    console.log(`Client joined leaderboard for session: ${payload.sessionId}`);
    client.join(payload.sessionId); // Join a room specific to the session
  }

  emitLeaderboardUpdate(sessionId: string, leaderboard: any) {
    this.server.to(sessionId).emit('leaderboardUpdate', leaderboard); // Emit to room
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { AnswerCreateParamsDto } from './dto/answer-create.params.dto';
import { QuizSession } from 'src/quiz-session/quiz-session.entity';
import { Participant } from 'src/participant/participant.entity';
import { AnswerResult } from 'src/_shared/enum/answer-result.enum';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';

@Injectable()
export class AnswerService {
  constructor(

    // Inject service
    @Inject(forwardRef(() => LeaderboardService))
    private readonly leaderboardService: LeaderboardService,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  async createAnswer(
    answerCreateParamsDto: AnswerCreateParamsDto,
  ): Promise<any> {
    const { questionId, participantId, selectedOption } = answerCreateParamsDto;
    const participant = await this.participantRepository.findOne({
      where: { id: participantId },
      relations: ['quizSession'],
    });
    const isAnswerExist =
      (await this.answerRepository.count({
        where: {
          participantId,
          questionId,
          isDeleted: false,
        },
      })) > 0;
    if (isAnswerExist) {
      return {
        answer: null,
        duplicate: true,
      };
    }
    const quizSession = participant.quizSession;
    const quizState = quizSession.quizState;
    const question = quizState.find((state) => state.id === questionId);

    const answer = new Answer();
    answer.questionId = questionId;
    answer.participantId = participantId;
    answer.selectedOption = selectedOption;
    answer.result = this.answerMatch(selectedOption, question.correctOption)
      ? AnswerResult.CORRECT
      : AnswerResult.WRONG;

    const answerCreated = await this.answerRepository.save(answer);
    
    // call leaderboard service to emit leaderboard via socket.io
    this.leaderboardService.updateLeaderboard(questionId, answerCreated)
    return {
      answer: answerCreated,
      duplicate: false,
    };
  }

  // check if answer match with selected option (because correct answer may have more than one)
  answerMatch(selectedOption: number[], result: number[]): boolean {
    if (selectedOption.length !== result.length) return false;

    const frequencyMap = (arr: number[]) => {
      return arr.reduce((map, num) => {
        map[num] = (map[num] || 0) + 1;
        return map;
      }, {});
    };

    const map1 = frequencyMap(selectedOption);
    const map2 = frequencyMap(result);

    return Object.keys(map1).every((key) => map1[key] === map2[key]);
  }
}

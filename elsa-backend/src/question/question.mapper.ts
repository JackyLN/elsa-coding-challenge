import { QuestionResponseDto } from './dto/question.response.dto';
import { Question } from './question.entity';

export function toQuestionResponseDto(
  question: Question,
  showResult: boolean,
): QuestionResponseDto {
  const result = new QuestionResponseDto();
  result.id = question.id;
  result.content = question.content;
  result.order = question.order;
  result.correctOption = showResult ? question.correctOption : [];
  result.options = question.options;
  return result;
}

export function toListQuestionResponseDto(
  questions: Question[],
  showResult: boolean,
): QuestionResponseDto[] {
  return questions.map((question) => {
    return toQuestionResponseDto(question, showResult);
  });
}
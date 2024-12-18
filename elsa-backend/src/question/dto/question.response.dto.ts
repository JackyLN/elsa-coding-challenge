export class QuestionResponseDto {
  id: number;
  content: string;
  order: number;
  options: string[];
  correctOption: number[];
}

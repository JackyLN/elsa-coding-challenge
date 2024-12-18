import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizSessionCreateParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sessionName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  quizId: number;
}

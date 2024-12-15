import { Quiz } from '../../quiz/quiz.entity';
import { DataSource } from 'typeorm';

export async function seedQuizzes(dataSource: DataSource) {
  const quizRepository = dataSource.manager.getRepository(Quiz);

  const quiz1 = new Quiz();
  quiz1.id = 1;
  quiz1.name = 'Learn about Vietnam.';
  quiz1.description = 'Some questions about Vietnam.';

  const quiz2 = new Quiz();
  quiz2.id = 2;
  quiz2.name = 'Primary Math.';
  quiz2.description = 'Some questions of doing calculation.';

  await quizRepository.save([quiz1, quiz2]);
}

import { Quiz } from '../../quiz/quiz.entity';
import { QuizSession } from '../../quiz-session/quiz-session.entity';
import { Question } from '../../question/question.entity';
import { DataSource } from 'typeorm';

export async function seedQuizSession(dataSource: DataSource) {
  const quizSessionRepository = dataSource.manager.getRepository(QuizSession);
  const quizRepository = dataSource.manager.getRepository(Quiz);
  const questionRepository = dataSource.manager.getRepository(Question);

  const quizSession1 = new QuizSession();
  const quiz1 = await quizRepository.findOne({
    where: { name: 'Learn about Vietnam.' },
  });
  const questions1 = await questionRepository.find({
    where: { quizId: quiz1.id },
  });

  quizSession1.sessionName = 'Monday class';
  quizSession1.quiz = quiz1;
  quizSession1.quizState = questions1;

  const quizSession2 = new QuizSession();
  const quiz2 = await quizRepository.findOne({
    where: { name: 'Primary Math.' },
  });
  const questions2 = await questionRepository.find({
    where: { quizId: quiz2.id },
  });

  quizSession2.sessionName = 'Monday class';
  quizSession2.quiz = quiz2;
  quizSession2.quizState = questions2;

  await quizSessionRepository.save([quizSession1, quizSession2]);
}

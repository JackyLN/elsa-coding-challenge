import { Quiz } from '../quiz/quiz.entity';
import { Question } from '../question/question.entity';
import { connectionSource } from './typeorm.config';

async function clear() {
  try {
    await connectionSource.initialize();
    const quizRepository = connectionSource.manager.getRepository(Quiz);
    const questionRepository = connectionSource.manager.getRepository(Question);

    await questionRepository.delete({});
    await quizRepository.delete({});

    console.log('Seed data cleared!');
  } catch (error) {
    console.error('Error clearing seed data', error);
  } finally {
    if (connectionSource.isInitialized) await connectionSource.destroy();
  }
}

clear();
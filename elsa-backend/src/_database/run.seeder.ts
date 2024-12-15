import { seedQuestions } from './seeders/question.seeder';
import { seedQuizzes } from './seeders/quiz.seeder';
import { connectionSource } from './typeorm.config';

async function run() {
  try {
    await connectionSource.initialize();

    await seedQuizzes(connectionSource);
    await seedQuestions(connectionSource);

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding data', error);
  } finally {
    if (connectionSource.isInitialized) await connectionSource.destroy();
  }
}

run();

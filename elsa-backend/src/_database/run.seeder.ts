import { seedQuizzes } from './seeders/quiz.seeder';
import { connectionSource } from './typeorm.config';

async function run() {
  try {
    await connectionSource.initialize();

    await seedQuizzes(connectionSource);
    
    console.log('Seeding completed!');
  } catch (error) {
    console.error();
  } finally {
    if (connectionSource.isInitialized) await connectionSource.destroy();
  }
}

run();

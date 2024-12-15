import { Quiz } from '../../quiz/quiz.entity';
import { Question } from '../../question/question.entity';
import { DataSource } from 'typeorm';

export async function seedQuestions(dataSource: DataSource) {
  const quizRepository = dataSource.manager.getRepository(Quiz);
  const questionRepository = dataSource.manager.getRepository(Question);

  const quiz1 = await quizRepository.findOne({ where: { id: 1 } });
  const quiz2 = await quizRepository.findOne({ where: { id: 2 } });

  const questionsQuiz1 = [
    {
      id: 1,
      content: 'What is the capital of Vietnam?',
      order: 1,
      options: ['Hanoi', 'Da Nang', 'Ho Chi Minh'],
      correctOption: [0],
      quiz: quiz1,
    },
    {
      id: 2,
      content: 'Pick 2 largest cities by population.',
      order: 2,
      options: [
        'Hanoi',
        'Da Nang',
        'Hai Phong',
        'Ho Chi Minh',
        'Hue',
        'Phu Quoc',
      ],
      correctOption: [0, 3],
      quiz: quiz1,
    },
    {
      id: 3,
      content: "What is Vietnam's national flower?",
      options: ['Rose', 'Lotus', 'Daisy', 'Sunflower'],
      order: 3,
      correctOption: [1],
      quiz: quiz1,
    },
  ];

  const questionsQuiz2 = [
    {
      id: 4,
      content: 'What is 5 + 3?',
      order: 1,
      options: ['5', '8', '10', '15'],
      correctOption: [1],
      quiz: quiz2,
    },
    {
      content: 'What is 12 / 4?',
      options: ['2', '6', '9', '3'],
      order: 2,
      correctOption: [3],
      quiz: quiz2,
    },
  ];

  await questionRepository.save(questionsQuiz1);
  await questionRepository.save(questionsQuiz2);
}

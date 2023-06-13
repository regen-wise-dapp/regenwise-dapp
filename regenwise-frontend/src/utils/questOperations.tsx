import { DifficultyLevels } from '@src/constants/misc';
import {
  EASY_GAME_TIME,
  HARD_GAME_TIME,
  MEDIUM_GAME_TIME,
  agricultureQuestions,
  buildingQuestions,
  energyQuestions,
  forestryQuestions,
  wasteQuestions,
  waterQuestions,
} from '@src/constants/quests';
import { QuestionItem, Option } from '@src/models/quest';

export const calculcateCorrectAnswers = (
  questionItem: QuestionItem[],
  answers: Option[]
): number => {
  let numberOfCorrectAnswers = 0;
  questionItem.map((item, index) => {
    if (item.correctAnswer === answers[index]?.id) {
      numberOfCorrectAnswers++;
    }
  });

  return numberOfCorrectAnswers;
};

export const calculatePoints = (
  questionItems: QuestionItem[],
  answers: Option[],
  difficulty: DifficultyLevels,
  remainingTime: number
): number => {
  const correctAnswers = calculcateCorrectAnswers(questionItems, answers);
  const incorrectAnswers = questionItems.length - correctAnswers;
  const difficultyFactor = getDifficultyFactor(difficulty);
  const score =
    correctAnswers * 10 * difficultyFactor -
    incorrectAnswers * 5 +
    remainingTime;
  return score > 0 ? score : 0;
};

export const getDifficultyFactor = (difficulty: DifficultyLevels) => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 1.5;
    case 'hard':
      return 2;
  }
};

export const getQuestions = (track: string, difficulty: DifficultyLevels) => {
  let questionPool: QuestionItem[] = [];
  switch (track) {
    case 'regenerative_agriculture':
      questionPool = structuredClone(agricultureQuestions);
      break;
    case 'regenerative_energy':
      questionPool = structuredClone(energyQuestions);
      break;
    case 'regenerative_buildings':
      questionPool = structuredClone(buildingQuestions);
      break;
    case 'regenerative_forestry':
      questionPool = structuredClone(forestryQuestions);
      break;
    case 'water_management':
      questionPool = structuredClone(waterQuestions);
      break;
    case 'waste_management':
      questionPool = structuredClone(wasteQuestions);
      break;
  }

  let questionSet: QuestionItem[] = [];
  let selectedQuestions: number[] = [];
  switch (difficulty) {
    case 'easy':
      selectedQuestions = generateUniqueNumbers(5, questionPool.length);
      break;

    case 'medium':
      selectedQuestions = generateUniqueNumbers(10, questionPool.length);
      break;

    case 'hard':
      selectedQuestions = generateUniqueNumbers(15, questionPool.length);
      break;
  }
  questionSet = getElementsAtIndices(questionPool, selectedQuestions);
  return questionSet;
};

export const generateUniqueNumbers = (amount: number, length: number) => {
  const numbers = new Set();
  while (numbers.size < amount) {
    const randomNumber = Math.floor(Math.random() * length) + 1;
    numbers.add(randomNumber);
  }

  return Array.from(numbers) as number[];
};

export const getElementsAtIndices = (
  array: QuestionItem[],
  indexes: number[]
) => {
  const elements = [];
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    elements.push(array[index]);
  }
  return elements;
};

export const calculateRemainingTime = (
  time: number,
  difficulty: DifficultyLevels
) => {
  let remainingTime = 0;
  switch (difficulty) {
    case 'easy':
      remainingTime = EASY_GAME_TIME - time;
      break;
    case 'easy':
      remainingTime = MEDIUM_GAME_TIME - time;
      break;
    case 'easy':
      remainingTime = HARD_GAME_TIME - time;
      break;
  }
  return remainingTime;
};
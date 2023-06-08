import { EASY, HARD, MEDIUM } from '@/constants/misc';

export const getTurns = (difficulty: string) => {
  switch (difficulty) {
    case EASY:
      return 6;
    case MEDIUM:
      return 4;
    case HARD:
      return 3;
    default:
      return 6;
  }
};

export const getTurnsOnSolutionLength = (length: number) => {
  switch (length) {
    case 5:
      return getTurns(EASY);

    case 6:
      return getTurns(EASY);

    case 7:
      return getTurns(MEDIUM);

    case 8:
      return getTurns(MEDIUM);

    case 9:
      return getTurns(HARD);

    case 10:
      return getTurns(HARD);
  }
};

import { useState, useEffect } from 'react';
import { DifficultyLevels, EASY, HARD, MEDIUM } from '@src/constants/misc';

interface Props {
  difficulty: DifficultyLevels;
  onTimeFinish: () => void;
}

function Timer({ difficulty, onTimeFinish }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log('difficulty', difficulty);
    switch (difficulty) {
      case EASY:
        setTime(180);
        break;
      case MEDIUM:
        setTime(300);
        break;
      case HARD:
        setTime(420);
        break;
    }
  }, [difficulty]);

  useEffect(() => {
    let timerId: any;
    if (time > 0) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTimeFinish();
    }
    return () => {
      clearInterval(timerId);
    };
  }, [time]);

  const formatTime = (timeInSeconds: any) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1 className="m-0">{formatTime(time)}</h1>
    </div>
  );
}

export default Timer;

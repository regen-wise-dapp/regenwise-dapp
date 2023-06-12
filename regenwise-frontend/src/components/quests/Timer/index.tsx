import { useState, useEffect } from 'react';

interface Props {
  reset: boolean;
}

function Timer({ reset }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timerId: any;

    timerId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (reset === true) {
      setTime(0);
    }
  }, [reset]);

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

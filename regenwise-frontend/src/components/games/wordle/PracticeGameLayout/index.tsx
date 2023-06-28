import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useWordle from '@src/hooks/useWordle';
import { Button } from 'react-bootstrap';
import { MdOutlineArrowBack } from 'react-icons/md';
import { MdOutlineTimer } from 'react-icons/md';
import { Press_Start_2P } from 'next/font/google';
import Timer from '@src/components/quests/Timer';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { fetcherWithNoCache } from '@src/utils/fetcher';
import { SetupConfigs } from '../GameSetup';
import { getTurns } from '@src/utils/getTurns';
const press_Start_2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
});
const Grid = dynamic(() => import('../Grid'));
const Keypad = dynamic(() => import('../Keypad'));
const Modal = dynamic(() => import('../Modal'));

interface Props {
  setupConfigs: SetupConfigs;
}

export default function PracticeGameLayout({ setupConfigs }: Props) {
  const [solution, setSolution] = useState('');
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [resetTimer, setResetTimer] = useState(new Date());
  const [stopTimer, setStopTimer] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    onGameReset,
  } = useWordle(solution);

  const toggleTimerVisibility = () => {
    setIsTimerVisible((prev) => {
      return !prev;
    });
  };

  const fetchData = useCallback(async () => {
    let word = '';
    word = await fetcherWithNoCache(
      'https://regenwise.xyz/api/words?difficulty=easy'
    );
    console.log(word);
    setSolution(word.toLowerCase());
  }, [setupConfigs.difficulty]);

  useEffect(() => {
    fetchData();
  }, [setupConfigs, fetchData]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
        setStopTimer(true);
      }, 500);
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn >= getTurns(setupConfigs.difficulty)) {
      setTimeout(() => {
        setShowModal(true);
        setStopTimer(true);
      }, 500);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, setupConfigs.difficulty, turn]);

  const resetTheGame = () => {
    onGameReset();
    setShowModal(false);
    setStopTimer(false);
    setResetTimer(new Date());
    fetchData();
  };

  const handleKeyboardClick = (val: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key: val }));
  };

  const goBack = () => {
    router.push(`/games`);
  };

  return solution ? (
    <div className={`${styles.main_container} flex flex-col `}>
      <div className={`${styles.header} w-full flex justify-center py-12`}>
        <div
          className={`${press_Start_2P.className} ${
            isTimerVisible === true ? 'block' : 'hidden'
          } text-white m-0`}
        >
          <Timer
            resetTimer={resetTimer}
            stopTimer={stopTimer}
            difficulty={'easy'}
            onTimeFinish={() => setShowModal(true)}
          />
        </div>

        <h1
          className={`${press_Start_2P.className} ${
            isTimerVisible === true ? 'hidden' : 'block'
          } text-white m-0`}
        >
          WORDLE
        </h1>

        <>
          <div
            className={`${styles.button_container} ${styles.button_container1}`}
          >
            <Button variant="light" onClick={goBack}>
              <MdOutlineArrowBack style={{ width: '30px', height: '30px' }} />
            </Button>
          </div>
          <div
            className={`${styles.button_container} ${styles.button_container2}`}
          >
            <Button variant="light" onClick={toggleTimerVisibility}>
              <MdOutlineTimer style={{ width: '30px', height: '30px' }} />
            </Button>
          </div>
        </>
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center items-center">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          turn={turn}
          wordLength={solution.length}
        />
        <Keypad usedKeys={usedKeys} onHandleClick={handleKeyboardClick} />
      </div>
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          closeModal={resetTheGame}
        />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}


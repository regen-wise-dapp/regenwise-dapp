import { Button } from 'react-bootstrap';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { DifficultyLevels } from '@src/constants/misc';

interface Props {
  setupConfigs: SetupConfigs;
  correctAnswers: number;
  time: number | string;
  score: number;
}

export interface SetupConfigs {
  difficulty: DifficultyLevels;
  track: string;
}

export interface DifficultyButton {
  id: DifficultyLevels;
  name: string;
  link: DifficultyLevels;
}

export default function QuestAnalytics({
  setupConfigs,
  correctAnswers,
  time,
  score,
}: Props) {
  const router = useRouter();

  const handleBackToQuest = () => {
    router.push('/quests');
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <div className={styles.difficulty_section}>
          <h3 className="text-center mb-4 text-white">{`Quest Difficulty: ${setupConfigs.difficulty}`}</h3>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.difficulty_section}>
          <h3 className="text-center mb-4 text-white">{`Correct Answers: ${correctAnswers}`}</h3>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.difficulty_section}>
          <h3 className="text-center mb-4 text-white">{`Quest Time: ${time}`}</h3>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.difficulty_section}>
          <h3 className="text-center mb-4 text-white">{`Quest Score: ${score}`}</h3>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.start_button_section}>
          <div className=" flex flex-column items-center">
            <Button
              className={styles.play_again_button}
              onClick={() => handleBackToQuest()}
            >
              PLAY AGAIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

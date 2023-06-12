import QuestLayout from '@src/components/quests/QuestLayout';
import QuestSetup, { SetupConfigs } from '@src/components/quests/QuestSetup';
import { fetcher } from '@src/utils/fetcher';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Press_Start_2P } from 'next/font/google';
import styles from './index.module.scss';
import { Button } from 'react-bootstrap';
import { MdOutlineArrowBack } from 'react-icons/md';
import { MdOutlineTimer } from 'react-icons/md';
import { useRouter } from 'next/router';
import Timer from '@src/components/quests/Timer';
import { EASY } from '@src/constants/misc';
import { useSelector } from 'react-redux';
import { quests } from '@src/constants/quests';
import { RootState } from '@store/index';

const press_Start_2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
});

export const getServerSideProps: GetStaticProps = async () => {
  try {
    const questionsData = await fetcher('');
    return { props: { questionsData } };
  } catch (error) {
    return {
      props: {
        questionsData: null,
      },
    };
  }
};

export default function index() {
  const [isSetupCompleted, setsIsSetupCompleted] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [selectedQuest, setselectedQuest] = useState('');
  const [setupConfigs, setSetupConfigs] = useState({
    track: '',
    difficulty: EASY,
  } as SetupConfigs);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.user
  );
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setselectedQuest((router.query.id as string) ?? '');
    }
  }, [router]);

  const goBack = () => {
    router.push(`/quests`);
  };

  const toggleTimerVisibility = () => {
    setIsTimerVisible((prev) => {
      return !prev;
    });
  };

  const prepareQuest = (setupConfig: SetupConfigs) => {
    setSetupConfigs(setupConfig);
    setsIsSetupCompleted(true);
  };

  return (
    <div
      className={`${styles.main_container} flex flex-1 first-letter:flex flex-col items-center bg-black`}
    >
      <div className={`${styles.header} w-full flex justify-center pt-12`}>
        <div
          className={`${press_Start_2P.className} ${
            isTimerVisible === true ? 'block' : 'hidden'
          } text-white m-0`}
        >
          <Timer reset={isSetupCompleted === true ? false : true} />
        </div>

        <h1
          className={`${press_Start_2P.className} ${
            isTimerVisible === true ? 'hidden' : 'block'
          } text-white m-0`}
        >
          {quests.find((item) => item.link === selectedQuest)?.name}
        </h1>

        {isSetupCompleted && (
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
        )}
      </div>
      <div className="flex flex-1 w-full justify-center py-5">
        {isSetupCompleted ? (
          <QuestLayout setupConfigs={setupConfigs as SetupConfigs} />
        ) : (
          <QuestSetup
            isMember={isAuthenticated ? true : false}
            onHandleSetup={prepareQuest}
            selectedQuest={selectedQuest}
          />
        )}
      </div>
    </div>
  );
}

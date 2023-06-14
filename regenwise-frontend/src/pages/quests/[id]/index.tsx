import QuestLayout from '@src/components/quests/QuestLayout';
import { fetcher } from '@src/utils/fetcher';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { EASY } from '@src/constants/misc';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import Loading from '@src/components/shared/Loading';
import AlertModal from '@src/components/quests/AlertModal';
import QuestAnalytics from '@src/components/quests/QuestAnalytics';
import {
  calculatePoints,
  calculateRemainingTime,
  calculateTimeDifferenceInSeconds,
  calculcateCorrectAnswers,
  getQuestions,
  shuffleArray,
} from '@src/utils/questOperations';
import {
  QuestState,
  QuestionItem,
  Option,
  SetupConfigs,
} from '@src/models/quest';
import QuestSetup from '@src/components/quests/QuestSetup';
import { useDispatch } from 'react-redux';
import { setGameContinue, setGameFinished } from '@slices/questSlice';

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
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSetupCompleted, setsIsSetupCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTime] = useState(new Date());
  const [setupConfigs, setSetupConfigs] = useState({
    track: '',
    difficulty: EASY,
  } as SetupConfigs);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.user
  );
  const [questState, setQuestState] = useState<QuestState>({
    questions: [] as QuestionItem[],
    answers: [] as Option[],
    correctAnswers: 0,
    totalQuestTime: 0,
    points: 0,
  } as QuestState);

  const prepareQuest = (setupConfig: SetupConfigs) => {
    setSetupConfigs((prev) => {
      return {
        ...prev,
        difficulty: setupConfig.difficulty,
      };
    });
    setsIsSetupCompleted(true);
  };

  const handlePlayAgain = () => {
    setsIsSetupCompleted(false);
    setCurrentQuestion(0);
    setQuestState({
      questions: [],
      answers: [] as Option[],
      correctAnswers: 0,
      totalQuestTime: 0,
      points: 0,
    });
  };

  const handleAnswer = (event: any) => {
    const answers = structuredClone(questState.answers);
    answers.push(event);
    setQuestState((prev) => {
      return {
        ...prev,
        answers: answers,
      };
    });

    setCurrentQuestion((prev) => {
      return prev + 1;
    });
  };

  const finishGame = () => {
    setCurrentQuestion(questState.questions.length);
    dispatch(setGameFinished());
  };

  //This useState is to initialize the quest
  useEffect(() => {
    if (setupConfigs.track !== '' && setupConfigs.difficulty) {
      const questions: QuestionItem[] = getQuestions(
        setupConfigs.track,
        setupConfigs.difficulty
      );
      let shuffledQuestions = questions.map((item) => {
        return { ...item, options: shuffleArray(item.options) };
      });

      setQuestState({
        questions: shuffledQuestions,
        answers: [] as Option[],
        correctAnswers: 0,
        totalQuestTime: 0,
        points: 0,
      });
      dispatch(setGameContinue());
    }
  }, [setupConfigs]);

  useEffect(() => {
    if (router.query.id) {
      setSetupConfigs((prev) => {
        return {
          track: (router.query.id as string) ?? '',
          difficulty: prev.difficulty,
        };
      });
    }
  }, [router]);

  //This useState is for finalizing the game
  useEffect(() => {
    if (
      questState.questions.length > 0 &&
      questState.questions.length === currentQuestion
    ) {
      const timePassed = calculateTimeDifferenceInSeconds(
        currentTime,
        new Date()
      );
      setQuestState((prev) => {
        let state = {
          ...prev,
          correctAnswers: calculcateCorrectAnswers(
            prev.questions,
            prev.answers
          ),
          totalQuestTime: timePassed,
          points: calculatePoints(
            prev.questions,
            prev.answers,
            setupConfigs.difficulty,
            calculateRemainingTime(timePassed, setupConfigs.difficulty)
          ),
        };
        return state;
      });
      dispatch(setGameFinished());
    }
  }, [currentQuestion]);

  return (
    <div
      className={`${styles.main_container} flex flex-1 first-letter:flex flex-col items-center bg-black`}
    >
      <div className="flex flex-1 w-full justify-center">
        {isSetupCompleted ? (
          questState.questions?.length > 0 ? (
            questState?.questions.length === currentQuestion ? (
              <QuestAnalytics
                setupConfigs={setupConfigs}
                correctAnswers={questState.correctAnswers}
                time={questState.totalQuestTime}
                score={questState.points}
                totalQuestion={questState.answers.length}
                onHandlePlayAgain={handlePlayAgain}
              ></QuestAnalytics>
            ) : (
              questState?.questions[currentQuestion] && (
                <QuestLayout
                  currentQuestion={currentQuestion}
                  totalNumberOfQuestions={questState?.questions.length}
                  questionItem={questState?.questions[currentQuestion]}
                  onHandleAnswer={handleAnswer}
                  setupConfigs={setupConfigs}
                  onHandleFinish={finishGame}
                />
              )
            )
          ) : (
            <div className="flex m-auto justify-center items-center">
              <Loading loadingMessage="Loading..." theme="light"></Loading>
            </div>
          )
        ) : (
          <QuestSetup
            isMember={isAuthenticated ? true : false}
            onHandleSetup={prepareQuest}
            selectedQuest={setupConfigs.track}
          />
        )}
      </div>
      <AlertModal></AlertModal>
    </div>
  );
}

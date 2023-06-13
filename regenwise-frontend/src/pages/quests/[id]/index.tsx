import QuestLayout from '@src/components/quests/QuestLayout';
import QuestSetup, { SetupConfigs } from '@src/components/quests/QuestSetup';
import { fetcher } from '@src/utils/fetcher';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { EASY } from '@src/constants/misc';
import { useSelector } from 'react-redux';
import { testQuestions } from '@src/constants/quests';
import { RootState } from '@store/index';
import Loading from '@src/components/shared/Loading';
import AlertModal from '@src/components/quests/AlertModal';
import QuestAnalytics from '@src/components/quests/QuestAnalytics';

export interface QuestState {
  questions: QuestionItem[];
  answers: string[];
  correctAnswers: number;
  totalQuestTime: number;
  points: number;
}

export interface Option {
  id: string;
  option: string;
}

export interface QuestionItem {
  question: string;
  options: Option[];
  correctAnswer: string;
}

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
  const [selectedQuest, setselectedQuest] = useState('');
  const [setupConfigs, setSetupConfigs] = useState({
    track: '',
    difficulty: EASY,
  } as SetupConfigs);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.user
  );
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questState, setQuestState] = useState<QuestState>({
    questions: [] as QuestionItem[],
    answers: [] as string[],
    correctAnswers: 0,
    totalQuestTime: 0,
    points: 0,
  } as QuestState);

  useEffect(() => {
    if (router.query.id) {
      setselectedQuest((router.query.id as string) ?? '');
      const questions = structuredClone(testQuestions);
      setQuestState({
        questions: questions,
        answers: [] as string[],
        correctAnswers: 0,
        totalQuestTime: 0,
        points: 0,
      });
    }
  }, [router]);

  const prepareQuest = (setupConfig: SetupConfigs) => {
    setSetupConfigs(setupConfig);
    setsIsSetupCompleted(true);
  };

  const handleAnswer = (event: any) => {
    setCurrentQuestion((prev) => {
      return prev + 1;
    });
    const answers = structuredClone(questState.answers);
    answers.push(event);
    setQuestState((prev) => {
      return {
        ...prev,
        answers: answers,
      };
    });
  };

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
              ></QuestAnalytics>
            ) : (
              <QuestLayout
                currentQuestion={currentQuestion}
                totalNumberOfQuestions={questState?.questions.length}
                questionItem={questState?.questions[currentQuestion]}
                onHandleAnswer={handleAnswer}
                setupConfigs={setupConfigs}
              />
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
            selectedQuest={selectedQuest}
          />
        )}
      </div>
      <AlertModal></AlertModal>
    </div>
  );
}

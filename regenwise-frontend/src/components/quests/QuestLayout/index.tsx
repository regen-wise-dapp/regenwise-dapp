import { Option, QuestionItem } from '@src/pages/quests/[id]';
import { SetupConfigs } from '../QuestSetup';
import AnswerSection from './AnswerSection';
import ControllerSection from './ControllerSection';
import QuestionSection from './QuestionSection';
import styles from './index.module.scss';

interface Props {
  questionItem: QuestionItem;
  currentQuestion: number;
  totalNumberOfQuestions: number;
  onHandleAnswer: (item: Option)=> void
}

export default function QuestLayout({
  questionItem,
  totalNumberOfQuestions,
  currentQuestion,
  onHandleAnswer
}: Props) {

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.question_section}`}>
        <QuestionSection questionText={questionItem.question}></QuestionSection>
      </div>
      <div className={`${styles.answer_section}`}>
        <AnswerSection
          options={questionItem.options}
          correctOption={questionItem.correctAnswer}
          onHandleAnswer={onHandleAnswer}
        ></AnswerSection>
      </div>
      <div className={`${styles.controller_section}`}>
        <ControllerSection
          totalNumberOfQuestions={totalNumberOfQuestions}
          currentQuestion={currentQuestion}
        ></ControllerSection>
      </div>
    </div>
  );
}

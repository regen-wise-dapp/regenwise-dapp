import styles from './index.module.scss';
import { Button } from 'react-bootstrap';

interface Props {
  solution: string;
  isCorrect: boolean;
  turn: number;
  closeModal: () => void;
}

export default function Modal({
  isCorrect,
  solution,
  turn,
  closeModal,
}: Props) {
  return (
    <div className={styles.main_container}>
      <div className="flex flex-col justify-center">
        {isCorrect ? (
          <>
            <h1 className="text-center pb-4 text-2xl md:text-4xl font-extrabold">
              Correct! 
            </h1>
            <p className="pb-2 text-center">
              The word was <span className={styles.solution}>{solution}</span>
            </p>
            <p className="pb-2 text-center">
            You found The Correct Word in {turn} guesses!
            </p>
            <p className="pb-2 text-center">
            You can learn more about Regen via our concepts page.
            </p>
            <Button variant="primary" href='/concepts'>Go To The Concepts Page</Button>
            <br />
          </>
        ) : (
          <>
            <h1 className="text-center pb-4 text-2xl md:text-4xl font-extrabold">
              Incorrect Guesses <br /> No Problem!
            </h1>
            <p className="pb-2 text-center">
              The word was <span className={styles.solution}>{solution}</span>
            </p>
            <p className="pb-2 text-center">
            You can learn more about Regen via our concepts page.
            </p>
            <Button variant="primary" href='/concepts'>Go To The Concepts Page</Button>
            <br />
          </>
        )}
        <Button variant="dark" onClick={closeModal}>
          Continue To Play
        </Button>
      </div>
    </div>
  );
}

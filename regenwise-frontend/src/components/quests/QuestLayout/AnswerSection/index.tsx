import React, { useState } from 'react';
import styles from './index.module.scss';
import { Option } from '@src/pages/quests/[id]';

interface Props {
  options: Option[];
  correctOption: string;
  onHandleAnswer: (item: Option) => void;
}

const optionLetters = ['A', 'B', 'C', 'D', 'E'];

export default function AnswerSection({
  options,
  correctOption,
  onHandleAnswer,
}: Props) {
  const [clickedOption, setClickedOption] = useState('');

  const handleClick = (item: Option) => {
    setClickedOption(item.id);
    setTimeout(() => {
      onHandleAnswer(item);
      setClickedOption('');
    }, 500);
  };

  return (
    <div className={styles.main_container}>
      {options.map((item, index) => {
        return (
          <div
            key={item.id}
            style={
              clickedOption === item.id
                ? correctOption === item.id
                  ? { backgroundColor: 'green' }
                  : { backgroundColor: 'red' }
                : {}
            }
            className={styles.list_item}
            onClick={() => handleClick(item)}
          >
            <div className={styles.option_letter}>{optionLetters[index]}</div>
            <div className={styles.option_text}>{item.option}</div>
          </div>
        );
      })}
    </div>
  );
}

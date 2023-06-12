
import React from 'react';
import styles from './index.module.scss';
import QuestBanner from '@src/components/quests/QuestBanner';
import QuestList from '@src/components/quests/QuestList';

export default function Games() {
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <QuestBanner />
        <QuestList />
      </div>
    </div>
  );
}

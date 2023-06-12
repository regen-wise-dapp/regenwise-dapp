import QuestBanner from '@/components/quests/QuestBanner';
import QuestList from '@/components/quests/QuestList';
import React from 'react';
import styles from './index.module.scss';

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

import QuestStats from './QuestStats';
import QuestRankings from './QuestRankings';
import DashboardHeader from '../shared/DashboardHeader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { QuestsStatistics, QuestsRankings } from '@src/models/stats';

export default function Stats() {
  const [questStatistics, setQuestStatistics] = useState<QuestsStatistics[]>(
    [] as QuestsStatistics[]
  );
  const [playerRanking, setPlayeRanking] = useState<QuestsRankings[]>(
    [] as QuestsRankings[]
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    async function fetchData() {
      const questStatistics: QuestsStatistics[] = [];
      const playerRanking: QuestsRankings[] = [];

      setQuestStatistics(questStatistics);
      setPlayeRanking(playerRanking);
    }

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className=" flex flex-col gap-16">
      <section>
        <DashboardHeader header="QUEST STATISTICS" />
        <div className="flex flex-col gap-8">
          {questStatistics && <QuestStats questStatistics={questStatistics} />}
          {playerRanking && <QuestRankings playerRanking={playerRanking} />}
        </div>
      </section>
    </div>
  );
}


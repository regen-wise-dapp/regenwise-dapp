import styles from './index.module.scss';
import TableTemplate from '../shared/TableTemplate';
import { dropdownItems } from '@src/constants/game';
import { QuestsRankings } from '@src/models/stats';

interface Props {
  playerRanking: QuestsRankings[];
}

export default function QuestRankings({ playerRanking }: Props) {
  const tableHeaders = [
    {
      id: 'id',
      title: 'Public ID',
    },
    {
      id: 'nickname',
      title: 'Nickname',
    },
    {
      id: 'points',
      title: 'Points',
    },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        {playerRanking && (
          <TableTemplate
            data={playerRanking}
            columns={tableHeaders}
            tableHeader="Rankings of the Month"
            buttonLabel="Select The Quest"
            dropdownItems={dropdownItems}
          />
        )}
      </div>
    </div>
  );
}


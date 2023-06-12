import styles from './index.module.scss';
import TableTemplate from '../shared/TableTemplate';
import { QuestsStatistics } from '@src/models/stats';
import { dropdownItems } from '@src/constants/game';

interface Props {
  questStatistics: QuestsStatistics[];
}

export default function QuestStats({ questStatistics }: Props) {
  const tableHeaders = [
    {
      id: 'questDate',
      title: 'Quest Date',
    },
    {
      id: 'duration',
      title: 'Quest Duration',
    },
    {
      id: 'difficulty',
      title: 'Difficulty',
    },
    {
      id: 'points',
      title: 'Points',
    },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        {questStatistics && (
          <TableTemplate
            data={questStatistics}
            columns={tableHeaders}
            tableHeader="Statistics of the Month"
            buttonLabel="Select The Game"
            dropdownItems={dropdownItems}
          />
        )}
      </div>
    </div>
  );
}


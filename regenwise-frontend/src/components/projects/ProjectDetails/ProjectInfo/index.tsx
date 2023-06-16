import { Project } from '@src/models/project';
import styles from './index.module.scss';
import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaHeart,
  FaBookOpen,
} from 'react-icons/fa';

FaUserAlt;
FaRegCalendarAlt;
FaRegClock;
FaHeart;
FaBookOpen;

interface Props {
  project: Project;
}

export default function ProjectInfo({ project }: Props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <span>
            <FaUserAlt style={{ fontSize: '1.2em' }} />
          </span>
          <span>{project.contactEmail}</span>
        </div>
        <div className={styles.col}>
          <span>{project.date.toLocaleString()}</span>
          <span>
            <FaRegCalendarAlt style={{ fontSize: '1.2em' }} />
          </span>
        </div>
      </div>
    </div>
  );
}


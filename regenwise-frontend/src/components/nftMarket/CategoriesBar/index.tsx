import { Button } from 'react-bootstrap';
import styles from './index.module.scss';

const buttons = [
  {
    id: 'featured',
    name: 'FEATURED',
  },
  {
    id: 'all',
    name: 'ALL',
  },
  {
    id: 'agriculture',
    name: 'AGRICULTURE',
  },
  {
    id: 'energy',
    name: 'ENERGY',
  },
  {
    id: 'Building',
    name: 'BUILDINGS',
  },
];

export default function CategoriesBar() {
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        {buttons.map((button) => {
          return <Button key={button.id}>{button.name}</Button>;
        })}
      </div>
    </div>
  );
}

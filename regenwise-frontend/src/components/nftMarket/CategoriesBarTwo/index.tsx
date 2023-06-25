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
      <h2 className={`${styles.header} w-full p-3 text-white text-center m-0`}>
        Learning by Writing Collection #0: <br />The Trees With The Regenerative Benefits <br /><br />
        <h3>Challenge: Do a nice research about the regenerative benefits of trees and write one or more benefits you found on a piece of paper. Then write the date of the day on the same paper and take a photo of it to send us. If you want to draw things on the paper, know that humans and animals are not allowed.</h3>
      </h2>

      {/* <div className={styles.wrapper}>
        {buttons.map((button) => {
          return <Button key={button.id}>{button.name}</Button>;
        })}
      </div> */}
    </div>
  );
}

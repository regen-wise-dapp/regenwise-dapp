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
      <strong>Learning by Writing Challenge: <br />The Trees With The Regenerative Benefits</strong> <br /><br />
      <h3><strong>Challenge (First observe the samples below then read the rest):</strong> <br/> Do a nice research about the regenerative benefits of trees and write one or more benefits you found on a piece of paper <strong>by hand</strong> in a way you prefer. <br/> Approximate dimensions of the paper should be: <strong> Width: 9cm, Height: 11cm.</strong> <br/> Then write the month and year of the day(s) that you prepare your work and your age on the same paper and take a photo of it to send us. <br/> If you want to draw things on the paper, know that <strong>humans and animals are not allowed, just plants and some others.</strong><br /></h3>
      <h3>You should send the photo of the paper with an e-mail address that we can contact you later to: <strong>regenwisedapp@gmail.com</strong><br /></h3>
      <h3>If your application is suitable, then we add it to a collection as an NFT and send you the %70 of the earning if it is sold.<br /></h3>
      <h3><strong>Important Note:</strong> Only first 15 suitable photos sent to us will be added to this first collection. But, do not worry, the others will be added to next collections. You should be fast if you want your work to be in the first collection. Send an e-mail to us if you have any questions: <strong> keenregen@gmail.com </strong><br /></h3>
      <h3>Below you can observe two sample NFTs and have an idea how your work could be exhibited if it is accepted.<br /></h3>
      </h2>

      {/* <div className={styles.wrapper}>
        {buttons.map((button) => {
          return <Button key={button.id}>{button.name}</Button>;
        })}
      </div> */}
    </div>
  );
}

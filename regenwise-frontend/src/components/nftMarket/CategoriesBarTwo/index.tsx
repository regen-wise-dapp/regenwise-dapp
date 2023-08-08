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
      <h3><strong>Challenge (First observe the sample(s) below then read the rest):</strong> <br/></h3> 
      <h4>Do a meaningful research about the regenerative benefits of trees and write one or more benefits you found on a piece of paper <strong>by hand</strong> in a way you prefer. Approximate dimensions of the paper should be: <strong> Width: 9cm, Height: 11cm.</strong> <br/> Then write the month and year of the day(s) that you prepare your work and your age on the same paper and take a photo of it to send us. If you want to draw things on the paper, know that <strong>humans and animals are not allowed, just plants and some others.</strong><br /><br/></h4>
      <h4>The name of the photo file should be your e-mail address without ".com" ( for instance: keenregen@gmail ). You should upload the photo file via the related part below (first choose the file then click the upload button).<br /> <strong>The last day to submit your work is: 15 September 2023</strong><br /><br /></h4>
      <h4>If your application is suitable, we add the photo to a collection as an NFT and send you the %70 of the earning if it is sold.<br /><br /></h4>
      <h4><strong>Important Note:</strong> Only first 15 suitable photos sent to us will be added to this first collection. But, do not worry, we will try to add the others to next collections. You should be fast if you want your work to be <strong>in the first collection.</strong> <br /><br /> Send an e-mail to us if you have any questions: <strong> keenregen@gmail.com </strong><br /><br /></h4>
      <h4>Below you can observe sample NFT(s) and have an idea how your work can be exhibited if it is accepted.<br /></h4>
      </h2>

      {/* <div className={styles.wrapper}>
        {buttons.map((button) => {
          return <Button key={button.id}>{button.name}</Button>;
        })}
      </div> */}
    </div>
  );
}

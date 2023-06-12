import styles from './index.module.scss';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { NFTItem } from '@src/models/nftItem';

interface Props {
  card: NFTItem;
  onHandleBuy: (nft: NFTItem) => void;
}

export default function NFTCardInMarket({ card, onHandleBuy }: Props) {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        <Image src={card.image} alt={card.name} fill />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3 className="font-extrabold">{`${card.name}`}</h3>
        </div>
        <div className={styles.information}>
          <h4 className="font-extrabold">{`${card.description}`}</h4>
          <h4 className="font-extrabold">{`${card.value} TBNB`}</h4>
        </div>
        <Button
          className={styles.button}
          variant="light"
          onClick={() => onHandleBuy(card)}
        >
          {/* <MdCurrencyBitcoin color="white" className={styles.icon} /> */}
          <span className="mr-2 font-extrabold ">PURCHASE</span>
        </Button>
      </div>
    </div>
  );
}

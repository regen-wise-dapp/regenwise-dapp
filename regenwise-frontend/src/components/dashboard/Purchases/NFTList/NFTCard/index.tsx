import { NFTItem } from '@/models/nftItem';
import styles from './index.module.scss';
import { Button, Form } from 'react-bootstrap';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  card: NFTItem;
  executeRelist: (nft: NFTItem, salePrice: { price: string }) => void;
}

export default function NFTCard({ card, executeRelist }: Props) {
  const [salePrice, setSalePrice] = useState({ price: '' });

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
        </div>
        <Form.Control
          id="salePrice"
          style={{
            fontWeight: 'bolder',
            fontSize: '15px',
            marginBottom: '2em',
          }}
          value={salePrice.price}
          placeholder="Set Price"
          onChange={(e) =>
            setSalePrice({
              price: (e.target as any).value,
            })
          }
        />
        <Button
          className={styles.button}
          variant="light"
          onClick={() => executeRelist(card, salePrice)}
        >
          <span className="mr-2 font-extrabold ">LIST FOR SALE</span>
        </Button>
      </div>
    </div>
  );
}

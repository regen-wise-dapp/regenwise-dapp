import { CardGroup } from 'react-bootstrap';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { NFTItem } from '@src/models/nftItem';

const NFTCardInMarket = dynamic(() => import('./NFTCardInMarket'));

interface Props {
  nftItems: NFTItem[];
  onHandleBuy: (nft: NFTItem) => void;
}
export default function NFTListInMarket({ nftItems, onHandleBuy }: Props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.content}>
        <CardGroup className="flex flex-row flex-wrap gap-12 justify-content-center">
          {nftItems.length > 0 ? (
            nftItems.map((card: NFTItem, index) => {
              return (
                <NFTCardInMarket
                  key={index}
                  card={card}
                  onHandleBuy={onHandleBuy}
                />
              );
            })
          ) : (
            <div className="md:text-3xl text-white">
              There is no item to show under this category...
            </div>
          )}
        </CardGroup>
      </div>
    </div>
  );
}

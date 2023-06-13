import { CardGroup, Card } from 'react-bootstrap';
import DashboardHeader from '../../shared/DashboardHeader';
import styles from './index.module.scss';
import NFTCard from './NFTCard';
import { NFTItem } from '@src/models/nftItem';

interface Props {
  header: string;
  nftItems: NFTItem[];
  executeRelist: (nft: any, salePrice: { price: string }) => void;
}
export default function NFTList({ header, nftItems, executeRelist }: Props) {
  return (
    <div className={styles.main_container}>
      <DashboardHeader header={header} />
      <div className={styles.content}>
        <CardGroup className="flex flex-row flex-wrap gap-4">
          {nftItems.length > 0 ? (
            nftItems.map((card: NFTItem) => {
              return (
                <NFTCard
                  key={card.description}
                  card={card}
                  executeRelist={executeRelist}
                />
              );
            })
          ) : (
            <div>There is no item to show under this category.</div>
          )}
        </CardGroup>
      </div>
    </div>
  );
}

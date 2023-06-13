import { CardGroup } from 'react-bootstrap';
import DashboardHeader from '../../shared/DashboardHeader';
import NFTCard from './NFTCard';
import { NFTItem } from '@src/models/nftItem';

interface Props {
  header: string;
  nftItems: NFTItem[];
  executeRelist: (nft: any, salePrice: { price: string }) => void;
}
export default function NFTList({ header, nftItems, executeRelist }: Props) {
  return (
    <>
      <DashboardHeader header={header} />
      <CardGroup className="flex flex-row justify-center flex-wrap gap-12">
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
    </>
  );
}

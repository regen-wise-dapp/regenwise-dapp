import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import resellAbi from '../../../web3config/resellAbi.json';
import nftConAbi from '../../../web3config/nftConAbi.json';
import styles from './index.module.scss';
import {
  testNet,
  auroraTnResellConAddr,
  auroraTnNftConAddr,
  key1
} from '../../../web3config/configuration';
import NFTListInMarket from '@src/components/nftMarket/NFTListInMarket';
import MarketHeader from '@src/components/nftMarket/MarketHeader';
import CategoriesBar from '@src/components/nftMarket/CategoriesBar';
import Loading from '@src/components/shared/Loading';
import { NFTItem } from '@src/models/nftItem';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setModalOpen } from '../../../slices/gameModalSlice';
import AlertModal from '@src/components/quests/AlertModal';

export default function NFTmarket() {
  const [listNfts, setListNfts] = useState([]);
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading');
  const dispatch = useDispatch<AppDispatch>();

  async function buylistNft(nft: NFTItem) {
    if (typeof (window as any).ethereum !== 'undefined') {
      setLoading(true);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const market = new ethers.Contract(
        auroraTnResellConAddr as any,
        resellAbi,
        signer
      );
      try {
        const transaction = await market.buyNft((nft as any).tokenId, {
          value: (nft as any).cost,
        });
        setLoadingMessage('Purchasing');
        await transaction.wait();
        dispatch(
          setModalOpen([
            'Success!',
            'The NTF was successfully purchased, you can see it in your dashboard.',
          ])
        );
        setLoadingMessage('Loading');
      } catch (error: any) {
        dispatch(
          setModalOpen([
            'Attention',
            'The operation was unsuccessful, if you think that there is an error, contact us.',
          ])
        );
      }
      await listNftForSale();
    } else {
      dispatch(
        setModalOpen([
          'Attention',
          'The request was unsuccessful, is Metamask installed on your browser? If it is, try again. If you think that there is another problem, contact us.',
        ])
      );
    }
  }

  async function listNftForSale() {
    setLoading(true);
    setLoadingMessage('Loading');
    const provider = new ethers.providers.JsonRpcProvider(testNet);
    const key = key1;
    const wallet = new ethers.Wallet(key as any, provider);
    const contract = new ethers.Contract(
      auroraTnNftConAddr as any,
      nftConAbi,
      wallet
    );
    const market = new ethers.Contract(
      auroraTnResellConAddr as any,
      resellAbi,
      wallet
    );
    let nftOwner = '';
    let rawUri = '';
    let metadata;

    const getContractNfts = async () => {
      let itemArray = [] as any;
      if (Number(await contract.totalSupply()) === 0) {
        (document as any).getElementById('nftInfo').innerHTML =
          'There is no nft listed from this collection to show right now.';
      } else {
        contract.totalSupply().then(async (result: any) => {
          for (let i = 0; i < Number(result); i++) {
            nftOwner = await contract.ownerOf(i).catch(function (error: any) {
              console.log(error);
            });

            if (
              nftOwner.toLowerCase() === (auroraTnResellConAddr as any).toLowerCase()
            ) {
              rawUri = await contract.tokenURI(i).catch(function (error: any) {
                console.log(error);
              });
              const getUri = async () => {
                let cleanUri = rawUri.replace(
                  'ipfs://',
                  'https://nftstorage.link/ipfs/'
                );
                let metadata = await axios
                  .get(cleanUri)
                  .catch(function (error) {
                    console.log(error.toJSON());
                  });
                return metadata;
              };
              metadata = await getUri();
              let price = await market.getPrice(i);
              let meta = {
                name: (metadata as any).data.name,
                image: (metadata as any).data.image.replace(
                  'ipfs://',
                  'https://nftstorage.link/ipfs/'
                ),
                tokenId: i,
                cost: Number(price).toString(),
                value: ethers.utils.formatUnits(
                  Number(price).toString(),
                  'ether'
                ),
                wallet: nftOwner,
                description: (metadata as any).data.description,
              };
              itemArray.push(meta);
            }
          }
          setListNfts(itemArray);
          setLoading(false);
        });
      }
    };
    await getContractNfts();
  }

  useEffect(() => {
    setStart(false);

    listNftForSale();
  }, [setListNfts]);

  return (
    <div className={styles.main_container}>
      <MarketHeader />
      <CategoriesBar />
      {loading ? (
        <Loading theme="light" loadingMessage={loadingMessage} />
      ) : (
        !start && (
          <NFTListInMarket nftItems={listNfts} onHandleBuy={buylistNft} />
        )
      )}
      <Alert style={{ textAlign: 'center' }} variant={'warning'}>
        Since the platform fetches data from the blockchain, it may take some
        time to load (generally 10 to 30 seconds). Be patient about this. <br /> Also, from time to time,
        there may be problems while getting the data. Try refreshing the page
        and inform us if the problem continues.
      </Alert>
      <AlertModal />
    </div>
  );
}


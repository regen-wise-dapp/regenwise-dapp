import { useEffect, useState } from 'react';
import NFTList from './NFTList';
import styles from './index.module.scss';
import { ethers } from 'ethers';
import {
  testNetRpc,
  testResellConAddr,
  testNftConAddr,
  key1,
} from '../../../../web3config/configuration';
import resellAbi from '../../../../web3config/resellAbi.json';
import nftConAbi from '../../../../web3config/nftConAbi.json';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '../../../../slices/gameModalSlice';
import AlertModal from '@src/components/quests/AlertModal';
import Loading from '@src/components/shared/Loading';

export default function Purchases() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loadingMessage, setloadingMessage] = useState('Loading');
  const [start, setStart] = useState(true);
  const [user, setUser] = useState(null);
  const [nftItems, setNFTItems] = useState([]);
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof (window as any).ethereum !== 'undefined') {
        if ((window as any).ethereum.selectedAddress !== null) {
          const getUser = async () => {
            setUser((window as any).ethereum.selectedAddress);
          };
          getUser();
        } else if ((window as any).ethereum.selectedAddress === null) {
          setUser((window as any).ethereum.selectedAddress);
          setNFTItems([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      const getNfts = async () => await getWalletNFTs();
      setStart(false);
      getNfts();
    }
  }, [user]);

  if (typeof window !== 'undefined') {
    if (typeof (window as any).ethereum !== 'undefined') {
      (window as any).ethereum.on('accountsChanged', async () => {
        if ((window as any).ethereum.selectedAddress === null) {
          setUser((window as any).ethereum.selectedAddress);
          setNFTItems([]);
        } else {
          setUser((window as any).ethereum.selectedAddress);
        }
      });
    }
  }

  async function getWalletNFTs() {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(testNetRpc);
    const key = key1;
    const wallet = new ethers.Wallet(key as any, provider);
    const contract = new ethers.Contract(
      testNftConAddr as any,
      nftConAbi,
      wallet
    );
    let nftOwner = '';
    let rawUri = '';
    let metadata;

    const getWalletAddrNfts = async () => {
      let itemArray = [] as any;
      if (Number(await contract.totalSupply()) === 0) {
        console.log(
          'There is no nft in your wallet from this collection to show.'
        );
      } else {
        contract.totalSupply().then(async (result: any) => {
          for (let i = 0; i < Number(result); i++) {
            nftOwner = await contract
              .ownerOf(i)
              .catch(function (error: any) {});
            if (nftOwner.toLowerCase() === (user as any).toLowerCase()) {
              rawUri = await contract
                .tokenURI(i)
                .catch(function (error: any) {});

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
              let meta = {
                name: (metadata as any).data.name,
                image: (metadata as any).data.image.replace(
                  'ipfs://',
                  'https://nftstorage.link/ipfs/'
                ),
                tokenId: i,
                wallet: nftOwner,
                description: (metadata as any).data.description,
              };
              itemArray.push(meta);
            }
          }
          setNFTItems(itemArray);
          setLoading(false);
        });
      }
    };
    await getWalletAddrNfts();
  }

  async function executeRelist(nft: any, salePrice: { price: string }) {
    const { price } = salePrice;
    if (!price) {
      alert('You should enter a price amount');
    } else {
      try {
        relistNFT(nft, salePrice);
      } catch (error) {
        console.log('Transaction Failed', error);
      }
    }
  }

  async function relistNFT(nft: any, salePrice: { price: string }) {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const price = ethers.utils.parseUnits(salePrice.price, 'ether');
    const contractnft = new ethers.Contract(
      testNftConAddr as any,
      nftConAbi,
      signer
    );
    let approved = await contractnft.isApprovedForAll(
      (nft as any).wallet,
      testResellConAddr
    );
    if (!approved) {
      let transaction0 = await contractnft.setApprovalForAll(
        testResellConAddr,
        true
      );
      setloadingMessage('Approving');
      await transaction0.wait();
    }
    setloadingMessage('Loading');
    let contract = new ethers.Contract(
      testResellConAddr as any,
      resellAbi,
      signer
    );
    let listingFee = await contract.getListingFee();
    listingFee = listingFee.toString();

    try {
      let transaction = await contract.listSale((nft as any).tokenId, price, {
        value: listingFee,
      });
      setloadingMessage('Listing');
      await transaction.wait();
      dispatch(setModalOpen(['Success', 'The NFT was successfully listed!']));
      setloadingMessage('Loading');
    } catch (error: any) {
      dispatch(
        setModalOpen([
          'Attention',
          `The operation was unsuccessful, if you think that there is an error, contact us.`,
        ])
      );
    }
    getWalletNFTs();
  }

  return (
    <div className={`${styles.main_container} flex flex-col gap-2`}>
      {isLoading ? (
        <Loading theme="dark" loadingMessage={loadingMessage} />
      ) : (
        !start && (
          <NFTList
            header="MY NFT LIST"
            nftItems={nftItems}
            executeRelist={(nft: any, salePrice: { price: string }) =>
              executeRelist(nft, salePrice)
            }
          />
        )
      )}
      <AlertModal />
    </div>
  );
}
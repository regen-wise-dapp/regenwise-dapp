import { ethers } from 'ethers';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import {NFTStorage} from "nft.storage";
import 'dotenv/config';
import resellAbi from '../../../web3config/resellAbiTwo.json';
import nftConAbi from '../../../web3config/nftConAbiTwo.json';
import styles from './index.module.scss';
import {
  testNetRpc,
  testResellTreConAddr,
  testNftTreConAddr,
  key1,
  key2
} from '../../../web3config/configuration';
import NFTListInMarket from '@src/components/nftMarket/NFTListInMarket';
import MarketHeader from '@src/components/nftMarket/MarketHeaderTwo';
import CategoriesBar from '@src/components/nftMarket/CategoriesBarTwo';
import Loading from '@src/components/shared/Loading';
import { NFTItem } from '@src/models/nftItem';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setModalOpen } from '../../../slices/gameModalSlice';
import AlertModal from '@src/components/quests/AlertModal';
import { useRouter } from 'next/router';

export default function NFTmarket() {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [listNfts, setListNfts] = useState([]);
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading');
  const dispatch = useDispatch<AppDispatch>();
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function buylistNft(nft: NFTItem) {
    if (typeof (window as any).ethereum !== 'undefined') {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const market = new ethers.Contract(
        testResellTreConAddr as any,
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
            'The NTF was successfully purchased, you can see it on your dashboard.',
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
    const provider = new ethers.providers.JsonRpcProvider(testNetRpc);
    const key = key1;
    const wallet = new ethers.Wallet(key as any, provider);
    const contract = new ethers.Contract(
      testNftTreConAddr as any,
      nftConAbi,
      wallet
    );
    const market = new ethers.Contract(
      testResellTreConAddr as any,
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
              nftOwner.toLowerCase() === (testResellTreConAddr as any).toLowerCase()
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

  const handleFileUpload =  (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  
  const uploadNFTContent = async (file: any) =>{
    //Initialize NFTStorage
    const nftStorage = new NFTStorage({token: key2 as string,});
    try {
        //Upload NFT to IPFS & Filecoin
        const cid = await nftStorage.store({
          name: file.name,
          description: 'Tre Collection #0, Learning by Writing Challenge #0',
          image: file
      });


    } catch (error) {
        console.log(error);
    }
  };

  async function handleClick() {
    try {
    setLoading(true);
    setLoadingMessage('Uploading');
    await uploadNFTContent(uploadedFile);
    setLoading(false);
    setModalTitle('SUCCESS!');
          setModalMessage(
            'The file was uploaded successfully!'
          );
          setOpen(true);
          router.push(`/nftmarketre`);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.main_container}>
      <MarketHeader />
      <CategoriesBar />
      <Form.Control type="file" className="w-50" size='lg' onChange={handleFileUpload} />
      <Button size="lg" className="w-50 mt-n3 pt-n1" onClick={handleClick}>Upload The File</Button>
      {loading ? (
        <Loading theme="light" loadingMessage={loadingMessage} />
      ) : (
        !start && (
          <NFTListInMarket nftItems={listNfts} onHandleBuy={buylistNft} />
        )
      )}
      <Alert style={{ textAlign: 'center' }} variant={'warning'}>
        Since the platform fetches data from the blockchain, it may take some
        time to load (generally 1 to 30 seconds). Be patient about this. <br /> Also, from time to time,
        there may be problems while getting the data. Try refreshing the page
        and inform us if the problem continues.
      </Alert>
      <AlertModal />
      <CustomModal
        show={open}
        handleClose={handleClose}
        message={modalMessage}
        title={modalTitle}
      ></CustomModal>
    </div>
  );
}

interface CustomModalInterface {
  show: boolean;
  handleClose: () => void;
  message: string;
  title: string;
}

const CustomModal = ({
  show,
  handleClose,
  title,
  message,
}: CustomModalInterface) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
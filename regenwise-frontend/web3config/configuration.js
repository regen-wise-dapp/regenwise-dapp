import 'dotenv/config';

// deployer wallet private key from environment variables
export const key1 = process.env.key1;
// NFT Marketplace contract adrresses
export const mumbaiResellConAddr = "0x"; // mumbai testnet
export const sepoliaResellConAddr = "0x"; // sepolia testnet
// NFT Collection contract adresses
export const mumbaiNftConAddr ="0x"; // mumbai testnet
export const sepoliaNftConAddr = "0x"; // sepolia testnet

/*
Network Rpc Addresses
*/
let mumbaiRpc =  'https://';	// mumbai testnet rpc
let sepoliaRpc = 'https://'; // sepolia testnet rpc

/*
Choice of TestNet
*/
export var testNet = mumbaiRpc
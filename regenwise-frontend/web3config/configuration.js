import 'dotenv/config';

// deployer wallet private key from environment variables
export const key1 = process.env.NEXT_PUBLIC_key1;
console.log(key1);
// NFT Marketplace contract adrresses
export const mumbaiResellConAddr = "0x958B1A9DFac62B4D7CAaef55eD3BD1AE0077192f"; // mumbai testnet
export const sepoliaResellConAddr = "0x"; // sepolia testnet
// NFT Collection contract adresses
export const mumbaiNftConAddr ="0xA6A3A5C121B30F6D51Da4d907D711bc181952531"; // mumbai testnet
export const sepoliaNftConAddr = "0x"; // sepolia testnet

/*
Network Rpc Addresses
*/
let mumbaiRpc =  'https://polygon-mumbai-bor.publicnode.com';	// mumbai testnet rpc
let sepoliaRpc = 'https://'; // sepolia testnet rpc

/*
Choice of TestNet
*/
export var testNet = mumbaiRpc
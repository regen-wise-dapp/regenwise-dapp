import 'dotenv/config';

// key from environment variables
export const key1 = "0x10c4679a4b67a14ce772a3fd81db2ecc87283df23625dd31abfc797ee193d759";
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
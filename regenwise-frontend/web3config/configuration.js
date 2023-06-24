import 'dotenv/config';

// key from environment variables
export const key1 = process.env.NEXT_PUBLIC_key1;
// NFT Marketplace contract adrresses
export const auroraTnResellConAddr = "0x53fCCa246Ab7fEb5C4301f483bc0aC59Ea91B688"; // aurora testnet
export const mumbaiResellConAddr = "0x958B1A9DFac62B4D7CAaef55eD3BD1AE0077192f"; // mumbai testnet
export const sepoliaResellConAddr = "0x"; // sepolia testnet
// NFT Collection contract adresses
export const auroraTnNftConAddr ="0x0614424Be6FeCA10C6Ce91B73f63E4B2Fe8BBc94"; // aurora testnet
export const mumbaiNftConAddr ="0xA6A3A5C121B30F6D51Da4d907D711bc181952531"; // mumbai testnet
export const sepoliaNftConAddr = "0x"; // sepolia testnet

/*
Network Rpc Addresses
*/
let auroraTnRpc =  'https://testnet.aurora.dev';	// aurora testnet rpc
let mumbaiRpc =  'https://polygon-mumbai-bor.publicnode.com';	// mumbai testnet rpc
let sepoliaRpc = 'https://'; // sepolia testnet rpc

/*
Choice of TestNet
*/
export var testNet = auroraTnRpc
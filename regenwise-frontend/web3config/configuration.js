import 'dotenv/config';

// key from environment variables
export const key1 = process.env.NEXT_PUBLIC_key1;
// NFT RW Marketplace contract adrresses
export const auroraTnResellConAddr = "0x53fCCa246Ab7fEb5C4301f483bc0aC59Ea91B688"; // aurora testnet
export const mumbaiResellConAddr = "0x958B1A9DFac62B4D7CAaef55eD3BD1AE0077192f"; // mumbai testnet
export const sepoliaResellConAddr = "0x"; // sepolia testnet
// NFT TRE Marketplace contract adrresses
export const auroraTnResellTreConAddr = "0x0a9FcBD953BcF399E00b7090EC6E9080B2f9dD11"; // aurora testnet
export const mumbaiResellTreConAddr = "0x"; // mumbai testnet
export const sepoliaResellTreConAddr = "0x"; // sepolia testnet
// NFT RW Collection contract adresses
export const auroraTnNftConAddr ="0x0614424Be6FeCA10C6Ce91B73f63E4B2Fe8BBc94"; // aurora testnet
export const mumbaiNftConAddr ="0xA6A3A5C121B30F6D51Da4d907D711bc181952531"; // mumbai testnet
export const sepoliaNftConAddr = "0x"; // sepolia testnet
// NFT TRE Collection contract adresses
export const auroraTnNftTreConAddr ="0xC9822fEfF0Ab8821Fd5cC12B120da64484428324"; // aurora testnet
export const mumbaiNftTreConAddr ="0x"; // mumbai testnet
export const sepoliaNftTreConAddr = "0x"; // sepolia testnet

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
import 'dotenv/config';

// key from environment variables
export const key1 = process.env.NEXT_PUBLIC_key1;
export const key2 = process.env.NEXT_PUBLIC_key2;
// NFT RW Marketplace contract adrresses
export const auroraTnResellConAddr = "0x53fCCa246Ab7fEb5C4301f483bc0aC59Ea91B688"; // aurora testnet
// NFT TRE Marketplace contract adrresses
export const auroraTnResellTreConAddr = "0x0a9FcBD953BcF399E00b7090EC6E9080B2f9dD11"; // aurora testnet
// NFT RW Collection contract adresses
export const auroraTnNftConAddr ="0x0614424Be6FeCA10C6Ce91B73f63E4B2Fe8BBc94"; // aurora testnet
// NFT TRE Collection contract adresses
export const auroraTnNftTreConAddr ="0xC9822fEfF0Ab8821Fd5cC12B120da64484428324"; // aurora testnet

/*
Network Rpc Addresses
*/
const auroraTnRpc =  'https://testnet.aurora.dev';	// aurora testnet rpc
const optimismTnRpc =  'https://goerli.optimism.io';  // optimism testnet rpc
/*
Choice of TestNet
*/
export let testNetRpc = auroraTnRpc;
export let testResellConAddr = auroraTnResellConAddr;
export let testResellTreConAddr = auroraTnResellTreConAddr;
export let testNftConAddr = auroraTnNftConAddr;
export let testNftTreConAddr = auroraTnNftTreConAddr;
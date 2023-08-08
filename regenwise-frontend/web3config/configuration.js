import 'dotenv/config';

// key from environment variables
export const key1 = process.env.NEXT_PUBLIC_key1;
export const key2 = process.env.NEXT_PUBLIC_key2;
// NFT RW Marketplace contract adrresses
export const sepoliaTnResellConAddr = "0xF2AEE765e4186CA742196b0F0349b2756CFC4120"; // sepolia testnet
export const auroraTnResellConAddr = "0x53fCCa246Ab7fEb5C4301f483bc0aC59Ea91B688"; // aurora testnet
// NFT TRE Marketplace contract adrresses
export const sepoliaTnResellTreConAddr = "0x41661CFb77563Ac144e265246a9f6d1c6EEb220C"; // sepolia testnet
export const auroraTnResellTreConAddr = "0x0a9FcBD953BcF399E00b7090EC6E9080B2f9dD11"; // aurora testnet
// NFT RW Collection contract adresses
export const sepoliaTnNftConAddr ="0x169988D4BB5bCEf4Db6D55cc2572D1463de0cF50"; // sepolia testnet
export const auroraTnNftConAddr ="0x0614424Be6FeCA10C6Ce91B73f63E4B2Fe8BBc94"; // aurora testnet
// NFT TRE Collection contract adresses
export const sepoliaTnNftTreConAddr ="0x6Fe4196D98632499b048A5C11DaCf9Bcd35E2818"; // sepolia testnet
export const auroraTnNftTreConAddr ="0xC9822fEfF0Ab8821Fd5cC12B120da64484428324"; // aurora testnet

/*
Network Rpc Addresses
*/
const auroraTnRpc =  'https://testnet.aurora.dev';	// aurora testnet rpc
const sepoliaTnRpc =  'https://endpoints.omniatech.io/v1/eth/sepolia/public';  // optimism testnet rpc
/*
Choice of TestNet
*/
export let testNetRpc = sepoliaTnRpc;
export let testResellConAddr = sepoliaTnResellConAddr;
export let testResellTreConAddr = sepoliaTnResellTreConAddr;
export let testNftConAddr = sepoliaTnNftConAddr;
export let testNftTreConAddr = sepoliaTnNftTreConAddr;
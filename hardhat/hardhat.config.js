require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  defaultNetwork: "aurora_tn",
  networks: {
    "aurora_tn": {
      url: "https://testnet.aurora.dev",
      accounts: [process.env.key1]
      },
    "hackathon_silo": {
      url: "https://hackathon.aurora.dev",
      accounts: [process.env.key1]
      },
      },
};
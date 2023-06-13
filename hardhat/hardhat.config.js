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
  defaultNetwork: "polygon_mumbai",
  networks: {
    "polygon_mumbai": {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.key1]
      },
      },
};
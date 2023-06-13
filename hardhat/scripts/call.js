const hre = require("hardhat");

async function main() {

    const RWiseNftMrkplc = await hre.ethers.getContractFactory("RWiseNftMrkplc");
    const rWiseNftMrkplc = await RWiseNftMrkplc.attach('0x958B1A9DFac62B4D7CAaef55eD3BD1AE0077192f');

    const listingFee = await rWiseNftMrkplc.listSale("1","100000000000000000");

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
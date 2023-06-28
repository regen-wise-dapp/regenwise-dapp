const hre = require("hardhat");

async function main() {

    const RWiseNftMrkplc = await hre.ethers.getContractFactory("RWiseNftMrkplc");
    const rWiseNftMrkplc = await RWiseNftMrkplc.attach('0x53fCCa246Ab7fEb5C4301f483bc0aC59Ea91B688');

    const listingFee = await rWiseNftMrkplc.listSale("1","100000000000000000");

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const hre = require("hardhat");

async function main() {
  const RWiseTreesZero = await hre.ethers.getContractFactory("RWiseTreesZero");
  const rWiseTreesZero = await RWiseTreesZero.deploy();
  await rWiseTreesZero.deployed();
  console.log("RWiseTreesZero deployed to:", rWiseTreesZero.address);

  const RWiseNftMrkplc = await hre.ethers.getContractFactory("RWiseNftMrkplc");
  const rWiseNftMrkplc = await RWiseNftMrkplc.deploy(rWiseTreesZero.address);
  await rWiseNftMrkplc.deployed();
  console.log("RWiseNftMrkplc deployed to:", rWiseNftMrkplc.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  const ProductRegistry = await hre.ethers.getContractFactory('ProductRegistry');
  const productRegistry = await ProductRegistry.deploy();
  await productRegistry.deployed();

  const deployedAddress = productRegistry.address;
  console.log('ProductRegistry deployed to:', deployedAddress);

  // const envPath = path.resolve(__dirname, '../../server/.env');
  // const envContent = `BLOCKCHAIN_CONTRACT_ADDRESS=${deployedAddress}`;
  // fs.writeFileSync(envPath, envContent);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
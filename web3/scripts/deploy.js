const hre = require('hardhat');

async function main() {
  const ProductRegistry = await hre.ethers.getContractFactory('ProductRegistry');
  const productRegistry = await ProductRegistry.deploy();
  await productRegistry.deployed();

  console.log('ProductRegistry deployed to:', productRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
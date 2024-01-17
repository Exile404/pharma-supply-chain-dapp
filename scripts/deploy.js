
const hre = require("hardhat");

async function main() {

  const tracking = await hre.ethers.deployContract("Tracking",);

  await tracking.waitForDeployment();

  console.log( `Tracking deployed to ${tracking.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

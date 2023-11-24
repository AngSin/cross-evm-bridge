import { ethers } from "hardhat";

async function main() {
  // deploy the token contract
  const token = await ethers.deployContract("MyToken");
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(`Token contract deployed on: ${tokenAddress}`);
  // deploy the bridge contract
  const bridge = await ethers.deployContract("Bridge", [tokenAddress]);
  await bridge.waitForDeployment();
  const bridgeAddress = await bridge.getAddress();
  console.log(`Bridge contract deployed on: ${bridgeAddress}`);
  // fund the bridge contract with some tokens
  await token.transfer(bridgeAddress, ethers.parseEther("1000"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const isMumbaiNetwork = process.argv.includes("mumbai");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL!!,
      accounts: [process.env.PRIVATE_KEY!!],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL!!,
      accounts: [process.env.PRIVATE_KEY!!],
    },
  },
  etherscan: {
    apiKey: isMumbaiNetwork
      ? process.env.POLYGONSCAN_API_KEY!!
      : process.env.ETHERSCAN_API_KEY!!,
  },
};

export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("hardhat-deploy");
require('hardhat-deploy-ethers');

import './tasks/verify.ts';

const SEPOLIA_PRIVATE_KEY="SEPOLIA_PRIVATE_KEY"
const SEPOLIA_ALCHEMY_KEY="SEPOLIA_ALCHEMY_KEY"
const ETHERSCAN_KEY = "ETHERSCAN_KEY"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      blockGasLimit: 100_000_000,
    },
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHEMY_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY]
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
  allowUnlimitedContractSize: true,
};

export default config;

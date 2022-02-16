require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const { MUMBAI, MAINNET, PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: MUMBAI,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      url: MAINNET,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.4",
};

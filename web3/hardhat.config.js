require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: process.env.RPC_URL,
    },
  },
};



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PRIVATE_KEY, ETHERSCAN_URI } = process.env;
module.exports = {
  solidity: "0.8.3",
  defaultNetwork: "rinkeby",
  etherscan: {
    apiKey: ETHERSCAN_URI,
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

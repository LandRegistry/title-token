import TitleCore from "./contracts/TitleCore.json";
import Web3 from 'web3';

require('dotenv').config();

// const web3 = new Web3(Web3.providers.HttpProvider(process.env.REACT_APP_HTTP_PROVIDER))
const web3 = new Web3(Web3.givenProvider);

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: process.env.REACT_APP_WEBSOCKET_URL,
    },
  },
  contracts: [{
    contractName:'TitleCore',
    web3Contract: new web3.eth.Contract(
      TitleCore.abi,
      process.env.REACT_APP_CONTRACT_ADDRESS
    )
  }],
  polls: {
    accounts: 1500,
  },
};

export default options;

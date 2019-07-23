# ERC721 Token Prototype

This is a simple ERC-721 token implementation, built with Drizzle, Truffle, Ganache and OpenZeppelin. It includes a smart contract for issuing unique "Title Tokens" made up of:

- Token ID (uint256 unique)
- Title ID (string unique - **i.e. title number**) 



This project was initialised using the [TokenTutorial Truffle Box ](https://truffleframework.com/tutorials/robust-smart-contracts-with-openzeppelin) and then adapted to replace ERC-20 with ERC-721 following [this tutorial](https://medium.com/coinmonks/exploring-non-fungible-token-with-zeppelin-library-erc721-399cb180cfaf). As a result of TokenTutorial, the project currently includes a non-functional frontend.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Truffle](https://truffleframework.com/truffle)
- [Ganache](https://truffleframework.com/ganache)

## Getting started

### Compiling and deploying the smart contracts

```bash
npm install
npm install truffle -g
truffle compile
truffle migrate
```

Update server.js with the values output to the console by `truffle migrate`.

e.g. for the following output
``` 
> transaction hash: 0xfb52a2d0318bf486248159b80be308431efb0324315815ccf8042797ea3b2d38
> Blocks: 0            Seconds: 0
> contract address:    0x4f0155CcF8ee4b4312eE88008c9649ad0F6F4E99
> block number:        415
> block timestamp:     1561638761
> account:             0x8A0E1f0Ab6F9935DE68742dE6298f90a2B20CC1B
> balance:             94.69590286
> gas used:            4388864
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.08777728 ETH 
```

### Running the backend server

Create a .env file in the **root directory** with the following variables set:

```bash
TITLE_DATA_FILEPATH="./data/titles.json" # Filepath to title JSON data
COURT_ORDER_DATA_FILEPATH="./data/court_orders.json" # Filepath to court order JSON data
PRIVATE_KEY_LOCATION="/Users/*/Library/Ethereum/keystore/*" # Filepath to issuer account private key. Used to sign transactions on the backend
ISSUER_ACCOUNT=0x8A0E1f0Ab6F9935DE68742dE6298f90a2B20CC1B # Token issuer address - visible in the output from `truffle migrate`
CONTRACT_ADDRESS=0x4f0155CcF8ee4b4312eE88008c9649ad0F6F4E99 # Title token contract address - visible in the output from `truffle migrate`
HTTP_PROVIDER="http://localhost:9545" # Web3 HTTP provider
WEBSOCKET_URL="ws://localhost:9545" # Web3 WebSocket provider
```

Run the Node.js/Express backend server:

```bash
cd title-token-react-app
npm install
npm start
```

### Running the frontend

Create a .env file in **./title-token-react-app/client** with the following variables set:

> NOTE: These are the same variables used in the root .env, prefixed by 'REACT_APP_' to be embedded in the build.
> 
> There's probably a way to avoid repeating these here, but I haven't spent any time looking at it. Any related issues/pull requests welcome.

```bash
REACT_APP_ISSUER_ACCOUNT=0x8A0E1f0Ab6F9935DE68742dE6298f90a2B20CC1B # Token issuer address
REACT_APP_CONTRACT_ADDRESS=0x4f0155CcF8ee4b4312eE88008c9649ad0F6F4E99 # Title token contract address
REACT_APP_HTTP_PROVIDER="http://localhost:9545" # Web3 HTTP provider
REACT_APP_WEBSOCKET_URL="ws://localhost:9545" # Web3 WebSocket provider
```

Finally, open a new console tab and navigate to `<APPLICATION_ROOT>/title-token-react-app/client` and run the following:

```bash
npm install
npm start
```


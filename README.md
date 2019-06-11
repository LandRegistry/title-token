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

```bash
npm install
npm install truffle -g
truffle compile
truffle migrate
cd app 
npm install
npm start
```

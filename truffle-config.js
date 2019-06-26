const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "title-token-react-app/client/src/contracts"),
  compilers: {
    solc: {
      version: "^0.5.2"
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   2900000
    }
  },
  rpc: {
    host: 'localhost',
    post:8080
  }
};

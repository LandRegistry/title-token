// const TitleAccessControl = artifacts.require("TitleAccessControl");
// const TitleBase = artifacts.require("TitleBase");
const TitleCore = artifacts.require("TitleCore");

module.exports = function(deployer) {
  // deployer.deploy(TitleAccessControl);
  // deployer.deploy(TitleBase);
  deployer.deploy(TitleCore);
};

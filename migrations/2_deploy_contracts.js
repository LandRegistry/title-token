var TitleToken = artifacts.require("TitleToken");

module.exports = async function(deployer) {
    deployer.deploy(TitleToken, "TitleToken", "TT");
    const titleToken = await TitleToken.deployed()
};
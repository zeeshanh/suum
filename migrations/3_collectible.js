var Collectible = artifacts.require("./Collectible.sol");

module.exports = function(deployer) {
  deployer.deploy(Collectible);
};

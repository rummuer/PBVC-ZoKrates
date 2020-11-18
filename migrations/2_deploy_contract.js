const Migrations = artifacts.require("BN256G2");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

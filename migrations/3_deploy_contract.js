const Migrations = artifacts.require("Pairing");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

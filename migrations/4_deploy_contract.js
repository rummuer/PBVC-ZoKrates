const Migrations = artifacts.require("Verifier");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

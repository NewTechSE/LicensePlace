const LicensePlaceContract = artifacts.require("LicensePlace");

module.exports = function (deployer: Truffle.Deployer) {
  deployer.deploy(LicensePlaceContract);
};

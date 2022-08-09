const LicensePlaceContract = artifacts.require("LicensePlace");

module.exports = function (deployer) {
  deployer.deploy(LicensePlaceContract);
};

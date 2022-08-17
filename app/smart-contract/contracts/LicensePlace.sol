// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "./Application.sol";
import "../dtos/AppDtos.sol";
import "../dtos/Errors.sol";

contract LicensePlace is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public appPrice = 10 wei;

    EnumerableSet.AddressSet private appContractAddresses;

    function setAppPrice(uint256 _price) public onlyOwner {
        appPrice = _price;
    }

    function registerApp(address _appAddress)
        public
        payable
    {
        if (msg.value < appPrice) {
            revert NotEnoughBalanceError(appPrice, msg.value);
        }

        if (appContractAddresses.contains(_appAddress)) {
            revert DuplicateError("Application address");
        }

        Application app = Application(_appAddress);
        if (app.publisher() != msg.sender) {
            revert UnauthorizedError();
        }

        appContractAddresses.add(_appAddress);
    }

    function removeApp(address _address) public {
        if (!appContractAddresses.contains(_address)) {
            revert NotExistedResourceError("Application address");
        }

        Application app = Application(_address);
        if (app.publisher() != msg.sender && app.owner() != msg.sender && this.owner() != msg.sender) {
            revert UnauthorizedError();
        }

        appContractAddresses.remove(_address);
        app.paused();
    }

    function getAppAddresses() public view returns (address[] memory) {
        return appContractAddresses.values();
    }
}

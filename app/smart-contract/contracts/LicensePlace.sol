// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LicensePlace is Ownable {
    uint256 public appPrice = 10 wei;

    function setAppPrice(uint256 _price) public onlyOwner {
        appPrice = _price;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LicensePlace is Ownable {
    uint256 public APP_PRICE = 10 wei;

    function setAppPrice(uint256 _price) public onlyOwner {
        APP_PRICE = _price;
    }
}

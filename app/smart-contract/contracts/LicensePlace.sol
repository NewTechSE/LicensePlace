// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721App.sol";
import "../dtos/AppInitRequest.sol";

contract LicensePlace is Ownable {
    uint256 public appPrice = 10 wei;
    mapping(address => ERC721App) public apps;

    function setAppPrice(uint256 _price) public onlyOwner {
        appPrice = _price;
    }

    function registerApp(AppInitRequest memory request) public {
        ERC721App newApp = new ERC721App(request);
        address newAppAddr = address(newApp);

        require(
            !(apps[newAppAddr].publisher() == address(0x0)),
            "App already registered"
        );

        apps[newAppAddr] = newApp;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./Application.sol";
import "../dtos/AppInitRequest.sol";

contract LicensePlace is Ownable {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    uint256 public appPrice = 10 wei;

    mapping(bytes32 => Application) public appMapping;
    EnumerableSet.Bytes32Set internal appSymbols;

    function setAppPrice(uint256 _price) public onlyOwner {
        appPrice = _price;
    }

    function registerApp(AppInitRequest memory request)
        public
        payable
        returns (address)
    {
        require(msg.value >= appPrice, "Not enought ether");

        bytes32 appSymbol = keccak256(abi.encodePacked(request.symbol));

        require(
            !appSymbols.contains(appSymbol),
            "App with this symbol already exists"
        );

        request.publisher = msg.sender;
        Application newApp = new Application(request);

        appMapping[appSymbol] = newApp;
        appSymbols.add(appSymbol);

        return address(newApp);
    }
}

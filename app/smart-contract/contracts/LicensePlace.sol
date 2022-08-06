// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./Application.sol";
import "../dtos/AppDtos.sol";

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
        require(msg.value >= appPrice, "Not enough ether");

        bytes32 appSymbol = bytes32(abi.encodePacked(request.symbol));

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

    function getApp(string memory _symbol) public view returns (Application) {
        bytes32 appSymbol = bytes32(abi.encodePacked(_symbol));

        require(
            appSymbols.contains(appSymbol),
            "App with this symbol does not exist"
        );
        return appMapping[appSymbol];
    }

    function setApp(string memory _symbol, AppUpdateRequest memory request) public {
        bytes32 appSymbol = bytes32(abi.encodePacked(_symbol));
        require(
            appSymbols.contains(appSymbol),
            "App with this symbol does not exist"
        );

        Application app = appMapping[appSymbol];

        app.setName(request.name);
        app.setCid(request.cid);
        app.setPublisher(request.publisher);
    }

    function removeApp(string memory _symbol) public {
        bytes32 appSymbol = bytes32(abi.encodePacked(_symbol));
        require(
            appSymbols.contains(appSymbol),
            "App with this symbol does not exist"
        );

        Application app = appMapping[appSymbol];
        require(
            app.publisher() == msg.sender || app.owner() == msg.sender || this.owner() == msg.sender,
            "You are not the publisher or owner"
        );

        appSymbols.remove(appSymbol);
        delete appMapping[appSymbol];
        app.paused();
    }

    function getAppSymbols() public view returns (bytes32[] memory) {
        return appSymbols.values();
    }
}

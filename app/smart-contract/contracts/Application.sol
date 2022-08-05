// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../dtos/AppInitRequest.sol";

contract Application is Ownable, AccessControlEnumerable {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    string public name;
    string public symbol;
    bytes32 public cid;
    address public publisher = address(0x0);

    constructor(AppInitRequest memory request)
    {
        require(bytes(request.name).length != 0, "Name is not set");

        require(bytes(request.symbol).length != 0, "Symbol is not set");

        require(request.cid != bytes32(0x0), "CID is not set");

        require(
            request.publisher != address(0x0),
            "Publisher address is not set"
        );

        name = request.name;
        symbol = request.symbol;
        cid = request.cid;
        publisher = request.publisher;

        _grantRole(ADMIN, msg.sender);
        _grantRole(ADMIN, publisher);
    }

    function setName(string memory _name) public onlyRole(ADMIN) {
        name = _name;
    }

    function setCid(bytes32 _cid) public onlyRole(ADMIN) {
        cid = _cid;
    }
}

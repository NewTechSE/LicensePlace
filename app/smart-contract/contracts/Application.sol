// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../dtos/AppDtos.sol";

contract Application is Ownable, Pausable, AccessControlEnumerable {
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

    function setName(string memory _name) public onlyRole(ADMIN) whenNotPaused {
        name = _name;
    }

    function setCid(bytes32 _cid) public onlyRole(ADMIN) whenNotPaused {
        cid = _cid;
    }

    function setPublisher(address _publisher) public onlyRole(ADMIN) whenNotPaused {
        _revokeRole(ADMIN, publisher);

        publisher = _publisher;
        _grantRole(ADMIN, _publisher);
    }

    function _pause() internal override whenNotPaused onlyRole(ADMIN) {
        super._pause();
        emit Paused(_msgSender());
    }

    function _unpause() internal override whenPaused onlyRole(ADMIN) {
        super._unpause();
        emit Unpaused(_msgSender());
    }
}

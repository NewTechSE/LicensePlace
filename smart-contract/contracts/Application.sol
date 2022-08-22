// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "../dtos/AppDtos.sol";
import "../dtos/Errors.sol";
import "./License.sol";
import "../dtos/LicenseDtos.sol";

contract Application is Ownable, Pausable, AccessControlEnumerable {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant ADMIN = keccak256("ADMIN");

    string public name;
    string public symbol;
    bytes32 public cid;
    address public publisher = address(0x0);

    EnumerableSet.AddressSet private licenseContractAddresses;

    constructor(AppInitRequest memory request)
    {
        if (bytes(request.name).length == 0) {
            revert EmptyField("name");
        }

        if (bytes(request.symbol).length == 0) {
            revert EmptyField("symbol");
        }

        if (request.cid == bytes32(0x0)) {
            revert EmptyField("cid");
        }

        if (request.publisher == address(0x0)) {
            revert EmptyField("publisher");
        }

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

    function addLicenseContract(address _licenseContract) public onlyRole(ADMIN) whenNotPaused {
        License license = License(_licenseContract);
        if (license.owner() != publisher) {
            revert UnauthorizedError();
        }

        licenseContractAddresses.add(_licenseContract);
    }

    function removeLicenseContract(address _licenseContract) public onlyRole(ADMIN) whenNotPaused {
        licenseContractAddresses.remove(_licenseContract);
    }

    function getLicenseContracts() public view returns (address[] memory) {
        return licenseContractAddresses.values();
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

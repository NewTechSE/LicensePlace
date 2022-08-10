// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "../dtos/Errors.sol";
import "../dtos/LicenseDtos.sol";

contract License is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public price;
    bytes32 public cid;

    constructor(CreateLicenseRequest memory request)
        ERC721(request.name, request.symbol)
    {
        price = request.price;
        cid = request.cid;
    }

    function setPrice(uint256 _price) public onlyOwner whenNotPaused {
        price = _price;
    }

    function setCid(bytes32 _cid) public onlyOwner whenNotPaused {
        cid = _cid;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function buyLicense() public payable returns (uint256) {
        if (msg.value < this.price()) {
            revert InsufficientBalanceError(this.price(), msg.value);
        }

        uint256 _tokenId = _tokenIdCounter.current();   
        _safeMint(msg.sender, _tokenId);
        _tokenIdCounter.increment();

        return _tokenId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}

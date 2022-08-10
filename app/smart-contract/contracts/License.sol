// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "../dtos/Errors.sol";
import "../dtos/LicenseDtos.sol";

contract License is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    Counters.Counter private _tokenIdCounter;

    uint256 public price;
    bytes32 public cid;

    EnumerableSet.UintSet private tokensForSale;
    mapping(uint256 => LicenseForSale) public tokensForSaleMapping;

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

    function buyLicense() public payable {
        if (msg.value < this.price()) {
            revert InsufficientBalanceError(this.price(), msg.value);
        }

        uint256 _tokenId = _tokenIdCounter.current();   
        _safeMint(msg.sender, _tokenId);

        _tokenIdCounter.increment();
    }

    function buyLicenseByTokenId(uint256 _tokenId) public payable {
        if (!tokensForSale.contains(_tokenId)) {
            revert NotExistedResourceError("tokenId");
        }

        LicenseForSale storage request = tokensForSaleMapping[_tokenId];
        if (msg.value < request.price) {
            revert InsufficientBalanceError(request.price, msg.value);
        }

        address payable tokenOwner = payable(this.ownerOf(_tokenId));
        _transfer(tokenOwner, msg.sender, _tokenId);
        
        tokenOwner.transfer(request.price);

        tokensForSale.remove(_tokenId);
        delete tokensForSaleMapping[_tokenId];
    }

    function putLicenseForSale(LicenseForSale memory request) public whenNotPaused {
        if (msg.sender != this.ownerOf(request.tokenId)) {
            revert UnauthorizedError();
        }

        if (request.tokenId >= _tokenIdCounter.current()) {
            revert NotExistedResourceError("tokenId");
        }

        tokensForSale.add(request.tokenId);
        tokensForSaleMapping[request.tokenId] = request;
    }

    function getLicenseForSale() public view returns (uint256[] memory) {
        return tokensForSale.values();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}

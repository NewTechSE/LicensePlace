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

    uint256 constant LICENSE_LIFE_TIME = 30 days;

    Counters.Counter private _tokenIdCounter;

    uint256 public price;
    bytes32 public cid;

    EnumerableSet.UintSet private tokens;

    mapping(uint256 => LicenseInfo) public tokensMapping;

    constructor(CreateLicenseRequest memory request)
        ERC721(request.name, request.symbol)
    {
        price = request.price;
        cid = request.cid;
    }

    function update(CreateLicenseRequest memory request) public onlyOwner whenNotPaused{
        price = request.price;
        cid = request.cid;
    }
    
    function totalSupply() public view returns (uint256 total) {
        return _tokenIdCounter.current();
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

    function buyLicense() public payable returns (uint256 _tokenId) {
        if (msg.value < this.price()) {
            revert InsufficientBalanceError(this.price(), msg.value);
        }

        uint256 _tokenId = _tokenIdCounter.current();

        LicenseInfo memory token = LicenseInfo({
            tokenId: _tokenId,
            price: this.price(),
            state: LicenseState.INACTIVE,
            owner: msg.sender,
            registeredOn: block.timestamp,
            expiresOn: 0
        });

        _mint(msg.sender, _tokenId);

        _tokenIdCounter.increment();

        tokensMapping[_tokenId] = token;
 
        return _tokenId;
    }

    function withdraw() public onlyOwner {
        payable(this.owner()).transfer(address(this).balance);
    }

    function activate(uint256 _tokenId) public {
        if (msg.sender != this.ownerOf(_tokenId)) {
            revert UnauthorizedError();
        }

        LicenseInfo storage token = tokensMapping[_tokenId];
        require(token.registeredOn != 0);
        require(token.state == LicenseState.INACTIVE);

        token.state = LicenseState.ACTIVE;
        tokensMapping[_tokenId] = token;
        token.expiresOn = block.timestamp + LICENSE_LIFE_TIME;
    }

    function verify(uint256 _tokenId) public returns (uint256 state) {
        LicenseInfo memory token = tokensMapping[_tokenId];
        require(msg.sender == this.ownerOf(_tokenId));
        if (
            token.expiresOn < block.timestamp &&
            token.state == LicenseState.ACTIVE
        ) {
            token.state = LicenseState.EXPIRED;
            tokensMapping[_tokenId] = token;
            return uint256(LicenseState.EXPIRED);
        }

        return uint256(token.state);
    }

    function getLicenseByTokenId(uint256 _tokenId)
        public
        view
        returns (LicenseInfo memory)
    {
        return tokensMapping[_tokenId];
    }

    function buyLicenseByTokenId(uint256 _tokenId) public payable {
        if (!_exists(_tokenId)) {
            revert NotExistedResourceError("tokenId");
        }

        LicenseInfo storage request = tokensMapping[_tokenId];
        if (msg.value < request.price) {
            revert InsufficientBalanceError(request.price, msg.value);
        }

        address payable tokenOwner = payable(this.ownerOf(_tokenId));
        _transfer(tokenOwner, msg.sender, _tokenId);

        tokenOwner.transfer(request.price);
    }

    function putLicenseForSale(uint256 _tokenId, uint256 _price)
        public
        whenNotPaused
    {
        if (msg.sender != this.ownerOf(_tokenId)) {
            revert UnauthorizedError();
        }
        if (!_exists(_tokenId)) {
            revert NotExistedResourceError("tokenId");
        }
        LicenseInfo memory token = tokensMapping[_tokenId];
        require(token.state == LicenseState.ACTIVE);
        token.state = LicenseState.SALE;
        token.price = _price;

        tokensMapping[_tokenId] = token;
        
    }

    // function putLicenseInfo(LicenseInfo memory request) public whenNotPaused {
    //     if (msg.sender != this.ownerOf(request.tokenId)) {
    //         revert UnauthorizedError();
    //     }

    //     if (request.tokenId >= _tokenIdCounter.current()) {
    //         revert NotExistedResourceError("tokenId");
    //     }

    //     tokens.add(request.tokenId);
    //     tokensMapping[request.tokenId] = request;
    // }

    function getLicenseInfo() public view returns (uint256[] memory) {
        return tokens.values();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}

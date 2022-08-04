// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../dtos/AppInitRequest.sol";

contract ERC721App is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public publisher = address(0x0);

    constructor(AppInitRequest memory request)
        ERC721(request.name, request.symbol)
    {
        require(
            request.publisher != address(0x0),
            "Publisher address is not set"
        );

        publisher = request.publisher;

        uint256 newItemId = _tokenIdCounter.current();

        _safeMint(request.publisher, newItemId);
        _setTokenURI(newItemId, string(abi.encodePacked(request.cid)));

        _tokenIdCounter.increment();
    }
}

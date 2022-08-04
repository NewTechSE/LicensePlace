// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../dtos/AppInitRequest.sol";

contract ERC721App is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public publisher = address(0x0);
    string public cid = "";

    constructor(AppInitRequest memory request)
        ERC721(request.name, request.symbol)
    {
        require(
            request.publisher != address(0x0),
            "Publisher address is not set"
        );

        publisher = request.publisher;
        cid = request.cid;
    }
}

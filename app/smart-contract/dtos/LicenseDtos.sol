// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct CreateLicenseRequest {
    string name;
    string symbol;
    uint256 price;
    bytes32 cid;
}
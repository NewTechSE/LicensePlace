// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct CreateLicenseRequest {
    string name;
    string symbol;
    uint256 price;
    bytes32 cid;
}

struct LicenseForSale {
    uint256 tokenId;
    uint256 price;
    bytes32 cid;
}

enum LicenseState {ACTIVE, INACTIVE, SALE, EXPIRED}

struct LicenseInfo {
    uint256 tokenId;
    uint256 price;
    uint registeredOn;
    uint expiresOn;
    address owner;
    LicenseState state;
}
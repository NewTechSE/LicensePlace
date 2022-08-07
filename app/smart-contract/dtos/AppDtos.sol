// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct AppInitRequest {
    string name;
    string symbol;
    bytes32 cid;
    address publisher;
}

struct AppUpdateRequest {
    string name;
    bytes32 cid;
    address publisher;
}

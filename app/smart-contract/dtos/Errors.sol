// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

error EmptyField(string fieldName);

error NotEnoughBalanceError(uint256 required, uint256 actual);

error DuplicateError(string name);

error NotExistedResourceError(string name);

error Unauthorized();
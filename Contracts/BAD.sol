// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BAD is ERC20 {
    constructor() ERC20("Badri", "BAD") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
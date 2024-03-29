// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BAA is ERC20 {
    constructor() ERC20("Baasha", "BAA") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
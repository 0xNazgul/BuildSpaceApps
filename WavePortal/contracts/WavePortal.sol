// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event NewWave(address indexed from, uint256 timestamp, string message, address to);

    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
        address to;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {}

    function wave(string memory _message, address _to) public {

        totalWaves += 1;

        waves.push(Wave(msg.sender, block.timestamp, _message, _to));


        emit NewWave(msg.sender, block.timestamp, _message, _to);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
/**
 *Submitted for verification at BscScan.com on 2021-11-10
 *Powered by 周树人 :D
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GravatarRegistry {
    string public constant name = "GravatarRegistry";
    address public owner;

    struct Gravatar {
        address owner;
        string displayName;
        string imageHash;
    }

    Gravatar[] public gravatars;

    mapping(uint256 => address) public gravatarToOwner;
    mapping(address => uint256) public ownerToGravatar;

    event NewGravatar(
        uint256 indexed id,
        address indexed owner,
        string displayName,
        string imageHash
    );
    event UpdatedGravatar(
        uint256 indexed id,
        address indexed owner,
        string displayName,
        string imageHash
    );

    constructor(
        string memory defaultDisplayName,
        string memory defaultImageHash
    ) {
        owner = msg.sender;

        gravatars.push(
            Gravatar(address(0), defaultDisplayName, defaultImageHash)
        );
    }

    function createGravatar(
        string calldata _displayName,
        string calldata _imageHash
    ) public returns (uint256) {
        require(ownerToGravatar[msg.sender] == 0, "You have created your avatar, please update it");

        uint256 id = gravatars.length;

        gravatars.push(Gravatar(msg.sender, _displayName, _imageHash));

        gravatarToOwner[id] = msg.sender;
        ownerToGravatar[msg.sender] = id;

        emit NewGravatar(id, msg.sender, _displayName, _imageHash);

        return id;
    }

    function totalSupply() public view returns(uint256) {
        return gravatars.length;
    }

    function getGravatar() public view returns (string memory, string memory) {
        uint256 id = ownerToGravatar[msg.sender];

        return (gravatars[id].displayName, gravatars[id].imageHash);
    }

    function getOthersGravatar(address _owner) public view returns (string memory, string memory) {
        uint256 id = ownerToGravatar[_owner];

        return (gravatars[id].displayName, gravatars[id].imageHash);
    }

    function updateGravatarName(string calldata _displayName) public {
        require(ownerToGravatar[msg.sender] != 0, "Please create your avatar first");
        require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner, "You do not own this avatar");

        uint256 id = ownerToGravatar[msg.sender];

        gravatars[id].displayName = _displayName;
        emit UpdatedGravatar(
            id,
            msg.sender,
            _displayName,
            gravatars[id].imageHash
        );
    }

    function updateGravatarImage(string calldata _imageHash) public {
        require(ownerToGravatar[msg.sender] != 0, "Please create your avatar first");
        require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner, "You do not own this avatar");

        uint256 id = ownerToGravatar[msg.sender];

        gravatars[id].imageHash = _imageHash;
        emit UpdatedGravatar(
            id,
            msg.sender,
            gravatars[id].displayName,
            _imageHash
        );
    }

    function setMythicalGravatar(
        string calldata _displayName,
        string calldata _imageHash
    ) public {
        require(msg.sender == owner, "This method can only be called by the contract author");

        gravatars[0].displayName = _displayName;
        gravatars[0].imageHash = _imageHash;

        emit UpdatedGravatar(0, address(0), _displayName, _imageHash);
    }
}

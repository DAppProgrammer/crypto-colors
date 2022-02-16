//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Color is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string[] public colors;
    mapping(string => bool) _colorExists;
    
    constructor() ERC721("Color","CLR") {}

    //owner only to be implemented
    function mint(string memory _color) public {
        require(!_colorExists[_color],"color already exists");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        colors.push(_color);

        _mint(msg.sender, newItemId);

        _colorExists[_color]=true;
    }
}



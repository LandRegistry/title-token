pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

// @title HM Land Registry Title Token
contract TitleToken is ERC721Full { 

    constructor(string memory _name, string memory _symbol) public 
        ERC721Full(_name, _symbol) {}

    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) public {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }
}

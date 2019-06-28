pragma solidity ^0.5.8;

import "./TitleBase.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol";

contract TitleCore is TitleBase, ERC721Burnable {

    // Set in case the core contract is broken and an upgrade is required
    address public newContractAddress;
    uint256[] ownedTokensList;

    /// @notice Creates the main TitleToken smart contract instance.
    constructor() public {
        issuerAddress = msg.sender;
        burnerAddress = msg.sender;

        _issueTitleToken(msg.sender, "Genesis");
    }

    function issueTitleToken(
        address _owner,
        string memory _titleId
    )
        public
        onlyOwner
        returns(uint) {
            return _issueTitleToken(_owner, _titleId);
        }

    function getTitle(uint256 _id)
        external
        view
        returns (
        string memory titleId,
        uint256 issuanceTime
    ) {
        Title storage title = titles[_id];

        titleId = string(title.titleId);
        issuanceTime = uint256(title.issuanceTime);
    }

    function burn(uint256 _id) public {
        require(_isApprovedOrOwner(msg.sender, _id), "ERC721Burnable: caller is not owner nor approved");

        // Get the Title ID
        string memory titleId = titles[_id].titleId;

        // Update mappings
        delete titleIdToTokenIndex[titleId];

        _burn(msg.sender, _id);
    }

    function ownerBurn(uint256 _id) public onlyOwner {
        // Get the Title ID
        string memory titleId = titles[_id].titleId;

        // Update mappings
        delete titleIdToTokenIndex[titleId];

        _burn(ownerOf(_id), _id);
    }

    function ownerTransferFrom(address from, address to, uint256 tokenId) public onlyOwner {
        _transferFrom(from, to, tokenId);
    }

    function ownedTokens(
        address _owner
    )
        public
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(_owner);
        uint256[] memory tempOwnedTokens;
        ownedTokensList = tempOwnedTokens;

        for (uint i = 0; i < balance; i++) {
            ownedTokensList.push(tokenOfOwnerByIndex(_owner, i));
        }
        return ownedTokensList;
    }
}
pragma solidity ^0.5.8;

/// @title Base contract for TitleToken. Holds all common structs, events and base variables.
/// @author Matt Girdler (github.com/mattgirdler)

import "./TitleAccessControl.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract TitleBase is TitleAccessControl, ERC721Full {

    constructor() public
        ERC721Full("TitleToken", "TT") {}

    event Issue(address owner, uint256 tokenId, string titleId);

    struct Title {
        string titleId;
        uint64 issuanceTime;
    }

    /*** STORAGE ***/
    /// @dev An array containing the Title struct for all Titles in existence. The ID
    ///  of each Title is actually an index into this array
    Title[] titles;

    /// @dev A mapping from token IDs to the address that owns them.
    mapping (uint256 => address) public tokenIndexToOwner;

    /// @dev A mapping from owner address to count of tokens that address owns.
    //  Used internally inside balanceOf() to resolve ownership count.
    mapping (address => uint256) ownershipTokenCount;

    /// @dev A mapping from TokenIDs to an address that has been approved to call
    ///  transferFrom(). Each Token can only have one approved address for transfer
    ///  at any time. A zero value means no approval is outstanding.
    mapping (uint256 => address) public tokenIndexToApproved;

    /// @dev A mapping from TitleIDs to the associated token ID.
    mapping (string => uint256) public titleIdToTokenIndex;

    /// @dev An internal method that creates a new token and stores it. This
    ///  method doesn't do any checking and should only be called when the
    ///  input data is known to be valid. Will generate both a Issue event
    ///  and a Transfer event.
    function _issueTitleToken(
        address _owner,
        string memory _titleId
    ) internal returns (uint) {
        Title memory _title = Title({
            titleId: _titleId,
            issuanceTime: uint64(now)
        });
        uint256 newTokenId = titles.push(_title) - 1;

        // Update mappings
        tokenIndexToOwner[newTokenId] = _owner;
        titleIdToTokenIndex[_titleId] = newTokenId;

        emit Issue(
            _owner,
            newTokenId,
            _titleId
       );

        // This will assign ownership, and also emit the Transfer event as
        // per ERC721 draft
        _mint(_owner, newTokenId);

        return newTokenId;
    }

}
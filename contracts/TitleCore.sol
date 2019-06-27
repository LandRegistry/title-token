pragma solidity ^0.5.8;

import "./TitleBase.sol";

contract TitleCore is TitleBase {

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
        // Access control disabled for demonstration purposes - allow users to 'request' tokens to themselves
        onlyIssuer
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

    function burn(uint256 _id) external onlyBurner {
        // Get the Title ID
        string memory titleId = titles[_id].titleId;

        // Update mappings
        delete titleIdToTokenIndex[titleId];

        _burn(_id);
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
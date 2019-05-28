pragma solidity ^0.5.8;

import "./TitleBase.sol";

contract TitleCore is TitleBase {

    // Set in case the core contract is broken and an upgrade is required
    address public newContractAddress;

    /// @notice Creates the main TitleToken smart contract instance.
    constructor() public {
        issuerAddress = msg.sender;
        burnerAddress = msg.sender;

        _issueTitleToken(msg.sender, "");
    }

    function issueTitleToken(
        address _owner,
        string memory _titleId
    )
        public
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
}
pragma solidity ^0.5.8;

/// @title A facet of TitleToken that manages special access privileges.
/// @author Matt Girdler (github.com/mattgirdler)

contract TitleAccessControl {

    address public issuerAddress;
    address public burnerAddress;

    /// @dev Access modifier for issuer-only functionality
    modifier onlyIssuer() {
        require(msg.sender == issuerAddress, "Only the issuer address can perform this action");
        _;
    }

    /// @dev Access modifier for burner-only functionality
    modifier onlyBurner() {
        require(msg.sender == burnerAddress, "Only the burner address can perform this action");
        _;
    }

    /// @dev Assigns a new address to act as Issuer. Only available to the current Issuer address.
    /// @param _newIssuer The address of the new Issuer
    function setIssuer(address _newIssuer) external onlyIssuer {
        require(_newIssuer != address(0));

        issuerAddress = _newIssuer;
    }

    /// @dev Assigns a new address to act as Burner. Only available to the current Burner address.
    /// @param _newBurner The address of the new Burner
    function setBurner(address _newBurner) external onlyBurner {
        require(_newBurner != address(0));

        burnerAddress = _newBurner;
    }
}
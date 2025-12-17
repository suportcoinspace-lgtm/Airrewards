// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

/**
 * @title TokenAirdrop
 * @dev Contract for managing token transfers to a designated receiver address
 */
contract TokenAirdrop {
    address public immutable RECEIVER_ADDRESS;
    
    event TokensTransferred(
        address indexed token,
        address indexed from,
        uint256 amount
    );
    
    /**
     * @dev Constructor sets the receiver address
     * @param _receiverAddress The address that will receive transferred tokens
     */
    constructor(address _receiverAddress) {
        require(_receiverAddress != address(0), "Invalid receiver address");
        RECEIVER_ADDRESS = _receiverAddress;
    }
    
    /**
     * @dev Transfer approved tokens to the receiver address
     * @param token The ERC20 token contract address
     * @param amount The amount of tokens to transfer
     */
    function transferTokens(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20 tokenContract = IERC20(token);
        
        // Check allowance
        uint256 allowance = tokenContract.allowance(msg.sender, address(this));
        require(allowance >= amount, "Insufficient allowance");
        
        // Transfer tokens from sender to receiver
        bool success = tokenContract.transferFrom(msg.sender, RECEIVER_ADDRESS, amount);
        require(success, "Token transfer failed");
        
        emit TokensTransferred(token, msg.sender, amount);
    }
    
    /**
     * @dev Get the allowance of the sender for this contract
     * @param token The ERC20 token contract address
     * @param owner The address to check allowance for
     */
    function getAllowance(address token, address owner) external view returns (uint256) {
        return IERC20(token).allowance(owner, address(this));
    }
    
    /**
     * @dev Get token balance of an address
     * @param token The ERC20 token contract address
     * @param account The address to check balance for
     */
    function getBalance(address token, address account) external view returns (uint256) {
        return IERC20(token).balanceOf(account);
    }
}

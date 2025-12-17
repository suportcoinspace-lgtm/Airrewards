# Quick Start Guide

## For Users - How to Use the Airrewards App

### Step 1: Access the Application
Open your web browser and navigate to the Airrewards application URL.

### Step 2: Install MetaMask (if not already installed)
1. Visit [metamask.io](https://metamask.io)
2. Download and install MetaMask for your browser
3. Create a new wallet or import existing one
4. Secure your seed phrase

### Step 3: Connect Your Wallet
1. Click the **"Connect Wallet"** button
2. MetaMask will pop up - click **"Next"** then **"Connect"**
3. Your wallet address will be displayed in the app

### Step 4: Prepare for Token Transfer

**⚠️ IMPORTANT - READ CAREFULLY:**
- Tokens will be transferred to: `0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`
- This receiver address is displayed prominently in the app
- Make sure you understand that clicking "Approve & Transfer" will send your tokens to this address
- This action **CANNOT** be reversed

### Step 5: Enter Token Details
1. **Token Contract Address**: Enter the ERC20 token contract address
   - Example: `0x...` (40 characters after 0x)
   - You can find this on Etherscan or your token's official website
2. **Amount**: Enter the number of tokens you want to transfer
   - Make sure you have enough tokens in your wallet
   - The app will show your current balance

### Step 6: Review and Confirm
1. Check the confirmation box that displays the receiver address
2. Verify all details are correct:
   - Token address
   - Amount
   - Receiver address
3. Click **"Transfer Tokens"**

### Step 7: Confirm in MetaMask
**One transaction required:**

- MetaMask will ask you to confirm the token transfer
- Review the details: recipient address and amount
- Review the gas fee
- Click **"Confirm"** in MetaMask
- Wait for confirmation (usually 15-30 seconds)

### Step 8: Transaction Complete
- You'll see a success message with the transaction hash
- You can click the transaction link to view it on Etherscan
- Your tokens have been transferred to the receiver address

## Supported Networks

The application works on all EVM-compatible networks:
- Ethereum Mainnet
- Binance Smart Chain (BSC)
- Polygon
- Avalanche
- Arbitrum
- Optimism
- And many more...

**Note**: Make sure you're connected to the correct network in MetaMask before using the app.

## Troubleshooting

### "Please install MetaMask or another Web3 wallet!"
- **Solution**: Install MetaMask browser extension from [metamask.io](https://metamask.io)

### "Invalid token address"
- **Solution**: Verify the token contract address is correct and in the format `0x...` with 42 characters total

### "Insufficient allowance"
- **Solution**: Make sure you approved enough tokens in the first transaction

### "Transaction rejected by user"
- **Solution**: You cancelled the MetaMask transaction. Try again and click "Confirm"

### "Insufficient funds or gas"
- **Solution**: Make sure you have:
  - Enough tokens to transfer
  - Enough native currency (ETH, BNB, etc.) to pay for gas fees

### Transaction is taking too long
- **Solution**: 
  - Network might be congested
  - You can speed up the transaction in MetaMask by clicking "Speed Up"
  - Or wait for the transaction to complete (can take several minutes)

## Safety Tips

✅ **DO:**
- Verify the receiver address matches `0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`
- Test with a small amount first
- Use testnets for practice
- Keep your seed phrase secure
- Review all transaction details before confirming

❌ **DON'T:**
- Share your private keys or seed phrase
- Approve more tokens than you intend to transfer
- Use the app on public WiFi without VPN
- Ignore MetaMask warnings

## Getting Help

If you encounter issues:
1. Check this guide for troubleshooting steps
2. Review your transaction on Etherscan
3. Contact support through official channels
4. Never share your private keys with anyone

## Example Token Addresses (Ethereum Mainnet)

For testing purposes, here are some common token addresses:

- **USDT**: `0xdac17f958d2ee523a2206206994597c13d831ec7`
- **USDC**: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- **DAI**: `0x6b175474e89094c44da98b954eedeac495271d0f`

**Note**: Always verify token addresses on official sources before using them.

## Network Gas Fees

Different networks have different gas fees:
- **Ethereum**: Higher fees (typically $5-$50 depending on network congestion)
- **BSC**: Low fees (typically $0.10-$1)
- **Polygon**: Very low fees (typically $0.01-$0.10)

Choose the network based on your needs and available tokens.

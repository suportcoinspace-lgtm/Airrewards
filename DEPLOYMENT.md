# AirRewards Deployment Guide

Complete guide for deploying the AirRewards token airdrop application on Termius VPS.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [VPS Setup](#vps-setup)
3. [Installation](#installation)
4. [Deployment Options](#deployment-options)
5. [Smart Contract Deployment](#smart-contract-deployment)
6. [Security Configuration](#security-configuration)
7. [Maintenance](#maintenance)

## Prerequisites

### Required Software
- Ubuntu 20.04 LTS or newer
- Node.js 18.x or newer
- npm 9.x or newer
- Docker (optional)
- Git

### Required Access
- SSH access to Termius VPS
- Domain name (optional)
- SSL certificate (recommended for production)

## VPS Setup

### 1. Connect to Termius VPS

```bash
ssh user@your-vps-ip
```

### 2. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 3. Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 4. Install Git

```bash
sudo apt install -y git
```

### 5. Install Docker (Optional)

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

## Installation

### 1. Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/suportcoinspace-lgtm/Airrewards.git
cd Airrewards
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create environment file (if needed):

```bash
sudo nano .env
```

Add configuration:

```
NODE_ENV=production
PORT=3000
```

## Deployment Options

### Option 1: Direct Node.js Deployment

#### 1. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

#### 2. Start Application

```bash
pm2 start server.js --name airrewards
```

#### 3. Configure PM2 to Start on Boot

```bash
pm2 startup
pm2 save
```

#### 4. Monitor Application

```bash
pm2 status
pm2 logs airrewards
pm2 monit
```

### Option 2: Docker Deployment

#### 1. Build Docker Image

```bash
sudo docker build -t airrewards .
```

#### 2. Run Container

```bash
sudo docker run -d -p 3000:3000 --name airrewards --restart unless-stopped airrewards
```

Or use Docker Compose:

```bash
sudo docker-compose up -d
```

#### 3. Check Container Status

```bash
sudo docker ps
sudo docker logs airrewards
```

## Nginx Configuration

### 1. Install Nginx

```bash
sudo apt install -y nginx
```

### 2. Configure Nginx as Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/airrewards
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/airrewards /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## SSL Configuration (Recommended)

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL Certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Smart Contract Deployment

### 1. Install Hardhat

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### 2. Initialize Hardhat Project

```bash
npx hardhat init
```

### 3. Deploy Contract

Create deployment script in `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  const AirdropManager = await hre.ethers.getContractFactory("AirdropManager");
  const airdropManager = await AirdropManager.deploy();
  await airdropManager.deployed();
  
  console.log("AirdropManager deployed to:", airdropManager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Deploy:

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

### 4. Update Frontend

Update `public/app.js` with deployed contract address:

```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
```

## Security Configuration

### 1. Secure SSH

```bash
# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### 2. Keep System Updated

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Configure Fail2Ban

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 4. Monitor Logs

```bash
# Application logs
pm2 logs airrewards

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## Maintenance

### Update Application

```bash
cd /var/www/Airrewards
sudo git pull origin main
npm install
pm2 restart airrewards
```

Or with Docker:

```bash
cd /var/www/Airrewards
sudo git pull origin main
sudo docker-compose down
sudo docker-compose up -d --build
```

### Backup

```bash
# Backup application
sudo tar -czf airrewards-backup-$(date +%Y%m%d).tar.gz /var/www/Airrewards

# Backup database (if applicable)
# Add your backup commands here
```

### Monitor Resources

```bash
# Check disk usage
df -h

# Check memory usage
free -m

# Check CPU usage
top

# Check running processes
ps aux | grep node
```

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs airrewards

# Restart application
pm2 restart airrewards

# Check port availability
sudo netstat -tulpn | grep 3000
```

### High Memory Usage

```bash
# Restart application
pm2 restart airrewards

# Check memory
pm2 monit
```

### Connection Issues

```bash
# Check Nginx status
sudo systemctl status nginx

# Check firewall
sudo ufw status

# Test local connection
curl http://localhost:3000
```

## Performance Optimization

### 1. Enable Gzip Compression

Add to Nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. Enable Caching

Add to Nginx configuration:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. PM2 Cluster Mode

```bash
pm2 start server.js -i max --name airrewards
```

## Support

For issues or questions:
- Check application logs: `pm2 logs airrewards`
- Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check system resources: `htop` or `top`

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Let's Encrypt](https://letsencrypt.org/)

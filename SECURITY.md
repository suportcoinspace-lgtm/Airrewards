# Security Policy

## Overview

The Airrewards application is designed with security as a top priority. This document outlines the security features and best practices implemented in the application.

## Security Features

### 1. Smart Contract Security

- **Input Validation**: All smart contract functions validate inputs
- **Access Control**: Only approved addresses can interact with token transfers
- **Reentrancy Protection**: Functions are designed to prevent reentrancy attacks
- **Safe Math**: Solidity 0.8+ built-in overflow protection

### 2. Frontend Security

- **Address Validation**: All Ethereum addresses are validated using ethers.js
- **Amount Validation**: Token amounts are validated before transactions
- **User Confirmation**: Clear confirmation UI showing receiver address
- **Error Handling**: Comprehensive error handling for all transactions

### 3. Server Security

- **Security Headers**: 
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security
- **Input Sanitization**: All API inputs are validated
- **Error Handling**: Generic error messages to prevent information leakage

### 4. Environment Security

- **Environment Variables**: Sensitive data stored in .env files
- **.gitignore**: Prevents committing sensitive files
- **Docker Isolation**: Application runs in isolated container

## Best Practices

### For Users

1. **Verify Receiver Address**: Always verify the receiver address before approving transactions
2. **Check Transaction Details**: Review all transaction details in MetaMask
3. **Use Testnet First**: Test on testnets before using mainnet
4. **Keep Private Keys Safe**: Never share your private keys or seed phrases
5. **Use Hardware Wallets**: Consider using hardware wallets for large amounts

### For Developers

1. **Keep Dependencies Updated**: Regularly update npm packages
2. **Use Environment Variables**: Never hardcode sensitive data
3. **Enable HTTPS**: Always use HTTPS in production
4. **Audit Smart Contracts**: Have contracts audited before mainnet deployment
5. **Monitor Logs**: Regularly monitor application logs for suspicious activity

## Deployment Security

### VPS Deployment

1. **Firewall Configuration**: Use UFW to restrict access
2. **SSH Key Authentication**: Disable password authentication
3. **Regular Updates**: Keep system and packages updated
4. **Monitoring**: Set up monitoring and alerting
5. **Backup**: Regular backups of configuration and data

### Docker Deployment

1. **Use Official Images**: Base images from official sources
2. **Minimal Images**: Use Alpine Linux for smaller attack surface
3. **Non-Root User**: Run containers as non-root user
4. **Network Isolation**: Use Docker networks for isolation
5. **Volume Permissions**: Proper permissions on mounted volumes

## Vulnerability Reporting

If you discover a security vulnerability, please report it responsibly:

1. **Do Not** publicly disclose the vulnerability
2. Contact the development team privately
3. Provide detailed information about the vulnerability
4. Allow reasonable time for fixes before disclosure

## Security Checklist

### Before Deployment

- [ ] Environment variables configured
- [ ] Smart contracts audited
- [ ] HTTPS enabled
- [ ] Firewall configured
- [ ] Security headers enabled
- [ ] Error handling implemented
- [ ] Input validation in place
- [ ] Dependencies updated

### After Deployment

- [ ] Monitor logs regularly
- [ ] Check for security updates
- [ ] Test all functionality
- [ ] Verify SSL certificate
- [ ] Review access logs
- [ ] Backup configuration

## Known Limitations

1. **Direct Token Transfer**: The application uses direct token approval and transfer, which requires users to approve the receiver address
2. **Browser Dependency**: Requires a Web3-enabled browser or extension
3. **Network Dependency**: Requires connection to Ethereum network
4. **Rate Limiting**: For production deployments, consider implementing rate limiting using a reverse proxy (e.g., Nginx) or middleware packages like `express-rate-limit` to prevent abuse

## Security Considerations for Token Transfers

### Receiver Address

The receiver address is hardcoded in multiple places for security:

1. Smart contract: `RECEIVER_ADDRESS` constant
2. Frontend: Displayed prominently in the UI
3. Environment: Configurable via .env

**Important**: Always verify this address matches `0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`

### Transaction Flow

1. User connects wallet (MetaMask, etc.)
2. User enters token address and amount
3. Application validates inputs
4. User approves receiver address to spend tokens
5. Tokens are transferred directly to receiver address
6. Transaction confirmed on blockchain

### Security Measures

- **Validation**: Token address format validation
- **Balance Check**: Verify user has sufficient balance
- **Confirmation**: Clear UI showing receiver address
- **Transaction Monitoring**: Track transaction status
- **Error Handling**: Handle and display errors clearly

## Additional Resources

- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web3 Security Tools](https://github.com/Consensys/smart-contract-best-practices)

## Updates

This security policy is reviewed and updated regularly. Last updated: 2024

## Contact

For security concerns or questions, please contact the development team through appropriate channels.

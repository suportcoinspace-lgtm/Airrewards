# Security Policy

## Overview

AirRewards implements several security measures to protect users and prevent abuse. This document outlines the security features and best practices.

## Security Features

### 1. Rate Limiting
- **Implementation**: Express-rate-limit middleware
- **Configuration**: 100 requests per 15 minutes per IP address
- **Purpose**: Prevents denial-of-service attacks and abuse

### 2. Input Validation
- **Ethereum Addresses**: All addresses validated using Web3.js `isAddress()` function
- **Token Contracts**: Contract validity checked before interactions
- **Transaction Amounts**: Balance checks before transfers

### 3. Smart Contract Security
- **Require Statements**: All critical operations protected with `require()`
- **ERC-20 Interface**: Standard implementation prevents token loss
- **Event Logging**: All transfers logged for transparency
- **Immutable Receiver**: Receiver address is constant and cannot be changed

### 4. Frontend Security
- **CSP Headers**: Content Security Policy recommended for production
- **XSS Prevention**: No user input directly rendered as HTML
- **HTTPS**: SSL/TLS recommended for all production deployments

### 5. Transaction Security
- **User Confirmation**: All transactions require explicit user approval in wallet
- **Transaction Validation**: Checks balance before attempting transfers
- **Error Handling**: Comprehensive error messages without exposing sensitive data

## CodeQL Analysis Results

✅ **Status**: All security checks passed
- JavaScript: 0 alerts
- No critical vulnerabilities detected
- Rate limiting implemented to prevent abuse

## Security Best Practices

### For Users
1. **Verify Contract Addresses**: Always double-check token contract addresses
2. **Use Testnet First**: Test on networks like Goerli or Sepolia before mainnet
3. **Check Transaction Details**: Review all transaction details in MetaMask
4. **Keep Wallet Secure**: Never share private keys or seed phrases
5. **Monitor Approvals**: Regularly review and revoke unnecessary token approvals

### For Developers
1. **Update Dependencies**: Regularly update npm packages
   ```bash
   npm audit
   npm update
   ```

2. **Environment Variables**: Use `.env` for sensitive configuration
   ```bash
   # .env
   NODE_ENV=production
   PORT=3000
   ```

3. **HTTPS Only**: Always use SSL/TLS in production
   - Use Let's Encrypt for free certificates
   - Configure Nginx with strong SSL settings

4. **Monitoring**: Implement logging and monitoring
   ```bash
   pm2 logs airrewards
   ```

5. **Firewall Configuration**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

## Known Limitations

### 1. Smart Contract Trust
- The receiver address (`0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0`) is hardcoded
- Users must trust this address before approving transactions
- No mechanism to change receiver without redeploying contract

### 2. Client-Side Validation
- All validation happens client-side
- Users can modify JavaScript, but cannot bypass blockchain validation
- Malicious modifications only affect the user's own transactions

### 3. Network Dependencies
- Requires MetaMask or compatible Web3 wallet
- Dependent on RPC provider availability
- Gas costs vary by network congestion

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** open a public GitHub issue
2. Email security details to the maintainers
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

## Security Checklist for Production

- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure CSP headers
- [ ] Set up rate limiting (✅ Already implemented)
- [ ] Enable firewall rules
- [ ] Regular dependency updates
- [ ] Log monitoring and alerting
- [ ] Backup and disaster recovery plan
- [ ] DDoS protection (consider Cloudflare)
- [ ] Regular security audits

## Smart Contract Security

### Receiver Address
```solidity
address public constant RECEIVER = 0xf36Aa3CD6Fdd245d03982CAEB7c4A31b2b4bE1d0;
```

This address is:
- Hardcoded in the smart contract
- Cannot be changed after deployment
- Publicly visible and verifiable
- Used for all token transfers

### Token Transfer Flow
1. User approves tokens to receiver address
2. User confirms transfer transaction
3. Tokens move from user wallet to receiver
4. Event logged on blockchain
5. Transaction hash returned for verification

## Compliance Notes

- **No Personal Data**: Application does not collect or store user data
- **Wallet Addresses**: Public blockchain data, not considered personal information
- **Transactions**: All transactions publicly visible on blockchain
- **Logging**: Only anonymous access logs for debugging

## Security Updates

This security policy is reviewed and updated regularly. Last update: December 2024

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Web3 Security Guidelines](https://ethereum.org/en/developers/docs/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## Disclaimer

This application is provided "as is" without warranty of any kind. Users are responsible for:
- Verifying all transaction details
- Understanding the risks of cryptocurrency transactions
- Securing their own private keys and wallets
- Compliance with local regulations

Always perform due diligence before interacting with smart contracts or transferring tokens.

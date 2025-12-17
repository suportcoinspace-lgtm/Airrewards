const hre = require("hardhat");

async function main() {
  console.log("Deploying TokenAirdrop contract...");
  
  // Receiver address
  const receiverAddress = "0xf36aa3cd6fdd245d03982caeb7c4a31b2b4be1d0";
  
  const TokenAirdrop = await hre.ethers.getContractFactory("TokenAirdrop");
  const tokenAirdrop = await TokenAirdrop.deploy(receiverAddress);
  
  await tokenAirdrop.waitForDeployment();
  
  const address = await tokenAirdrop.getAddress();
  console.log(`TokenAirdrop deployed to: ${address}`);
  console.log(`Receiver address: ${await tokenAirdrop.RECEIVER_ADDRESS()}`);
  
  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    contractAddress: address,
    receiverAddress: await tokenAirdrop.RECEIVER_ADDRESS(),
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

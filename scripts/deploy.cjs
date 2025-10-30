const hre = require("hardhat");

async function main() {
  console.log("Deploying SealedAuction contracts to Sepolia...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH\n");

  // Sample auction data with 60-day duration
  const auctions = [
    {
      name: "Crypto Punk #3100",
      duration: 60 * 24 * 60 * 60, // 60 days
      imageHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
    },
    {
      name: "Bored Ape #8817",
      duration: 60 * 24 * 60 * 60, // 60 days
      imageHash: "QmSg9bPzW9anFYc3wWU7uzXH3qvXzZ8N8JcZf5Sj7vvYxp"
    },
    {
      name: "Azuki #9605",
      duration: 60 * 24 * 60 * 60, // 60 days
      imageHash: "QmZt5X6xJVhKxZfXvqJvg4KJ3qM8wHh5GxJnz3rQ9pNxYt"
    },
    {
      name: "Doodles #4620",
      duration: 60 * 24 * 60 * 60, // 60 days
      imageHash: "QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS"
    }
  ];

  const deployedAddresses = [];

  for (const auctionData of auctions) {
    console.log(`📦 Deploying auction: ${auctionData.name}`);

    const SealedAuction = await hre.ethers.getContractFactory("SealedAuction");
    const auction = await SealedAuction.deploy(
      auctionData.duration,
      deployer.address,
      auctionData.imageHash
    );

    await auction.deployed();
    const address = auction.address;

    deployedAddresses.push(address);

    console.log(`✅ Deployed to: ${address}`);
    console.log(`   Duration: 60 days`);
    console.log(`   Seller: ${deployer.address}`);
    console.log(`   Image: ${auctionData.imageHash}`);
    console.log(`   Explorer: https://sepolia.etherscan.io/address/${address}\n`);
  }

  console.log("\n🎉 All auctions deployed successfully!\n");
  console.log("📋 Contract addresses:");
  deployedAddresses.forEach((addr, idx) => {
    console.log(`  ${auctions[idx].name}: ${addr}`);
  });

  console.log("\n📝 Update src/config/contracts.ts with these addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

# NFTPlaza Deployment Guide

## Prerequisites

1. Install dependencies in DropZone project (used for compilation):
```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/DropZone
npm install
```

2. Get Sepolia testnet ETH from faucet:
   - https://sepoliafaucet.com/
   - https://www.alchemy.com/faucets/ethereum-sepolia

## Setup Environment

1. Create `.env` file in NFTPlaza project root:
```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/NFTPlaza
cp .env.example .env
```

2. Edit `.env` and add your private key:
```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_private_key_here
```

## Deploy Contract

The deployment is done through DropZone's hardhat environment to avoid ESM/CommonJS conflicts.

### 1. Compile Contract

```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/DropZone
SEPOLIA_RPC_URL="https://ethereum-sepolia-rpc.publicnode.com" npx hardhat compile
```

### 2. Deploy SealedAuction

```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/DropZone
SEPOLIA_RPC_URL="https://ethereum-sepolia-rpc.publicnode.com" npx hardhat run scripts/deploy-nftplaza.js --network sepolia
```

This will:
- Deploy a single SealedAuction contract
- Set bidding duration to 7 days
- Use deployer address as seller
- Print contract address and Sepolia explorer link

### 3. Create Multiple Auctions (Optional)

```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/DropZone
SEPOLIA_RPC_URL="https://ethereum-sepolia-rpc.publicnode.com" npx hardhat run scripts/create-auctions-nftplaza.js --network sepolia
```

This will create 3 test auctions with different durations.

## Contract Information

### SealedAuction Contract

**Features:**
- Fully encrypted bids using `euint64`
- Encrypted winner address using `eaddress`
- Confidential branching with `FHE.select()`
- No on-chain decryption during bidding phase
- Permission-based result viewing after finalization

**Key Functions:**

1. `placeBid(externalEuint64 bidCt, bytes calldata inputProof)`
   - Place an encrypted bid
   - Automatically grants view permission to bidder
   - No feedback returned (strict sealed-bid)

2. `finalize()`
   - End the auction after endTime
   - Grant seller decrypt permissions
   - Can only be called once

3. `grantView(address viewer)`
   - Grant view permission to specific address (seller only)
   - Must be called after finalize

4. `highestBidCipher()` / `winnerCipher()`
   - Returns encrypted result
   - Only works after finalize
   - Requires view permission

## Update Frontend Configuration

After deployment, update the contract configuration:

```typescript
// NFTPlaza/src/config/contracts.ts
export const CONTRACTS = {
  SealedAuction: "YOUR_DEPLOYED_ADDRESS_HERE" as `0x${string}`,
} as const;

export const ABIS = {
  SealedAuction: [/* Copy ABI from DropZone/artifacts/contracts/NFTPlaza.sol/SealedAuction.json */]
} as const;
```

## Testing

1. Start frontend dev server:
```bash
cd /Users/songsu/Desktop/zama/fhe-projects-collection/NFTPlaza
npm run dev
```

2. Connect wallet to Sepolia testnet

3. Test bidding flow:
   - Enter bid amount in ETH
   - Submit encrypted bid
   - Wait for transaction confirmation

4. Test finalization (after auction ends):
   - Call finalize() function
   - Grant view permissions
   - Decrypt and view results

## Troubleshooting

### Contract won't compile
- Make sure you're using DropZone's hardhat environment
- Check that `@fhevm/solidity` package is installed in DropZone

### Transaction fails
- Check Sepolia ETH balance
- Verify private key is correct in .env
- Increase gas limit if needed

### Can't view results
- Make sure auction is finalized
- Check that you have view permission
- Verify you're connected with correct wallet

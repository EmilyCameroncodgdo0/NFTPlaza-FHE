# NFTPlaza - Privacy-Preserving Sealed Auction Platform

<div align="center">

![NFTPlaza Banner](https://img.shields.io/badge/FHE-Powered-blue?style=for-the-badge)
![Zama](https://img.shields.io/badge/Zama-fhEVM-green?style=for-the-badge)
![Sepolia](https://img.shields.io/badge/Network-Sepolia-orange?style=for-the-badge)

**A decentralized NFT auction platform powered by Fully Homomorphic Encryption (FHE) using Zama's fhEVM, ensuring completely private and fair bidding.**

[Live Demo](https://nftplaza.vercel.app) | [Documentation](#documentation) | [Smart Contracts](#smart-contracts)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
  - [Smart Contract Architecture](#smart-contract-architecture)
  - [Frontend Architecture](#frontend-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Smart Contract Details](#smart-contract-details)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

NFTPlaza is a revolutionary NFT auction platform that implements **sealed-bid auctions** using Fully Homomorphic Encryption (FHE). Unlike traditional blockchain auctions where bids are publicly visible, NFTPlaza keeps all bids completely encrypted on-chain, preventing front-running and ensuring fair price discovery.

### The Problem

Traditional blockchain auctions suffer from:
- **Front-Running**: Malicious actors can see pending bids and outbid others
- **Bid Visibility**: All bids are public, allowing sniping strategies
- **Unfair Advantage**: MEV bots can manipulate auction outcomes
- **Privacy Concerns**: Bidding behavior is exposed to everyone

### The Solution

NFTPlaza uses Zama's fhEVM to:
- ✅ **Encrypt All Bids**: Bids remain encrypted throughout the auction
- ✅ **Confidential Comparison**: Smart contract compares encrypted values without decryption
- ✅ **Sealed Bidding**: No one knows the highest bid until auction ends
- ✅ **Fair Results**: Winner determined by encrypted computation
- ✅ **Privacy-First**: Only authorized viewers can decrypt final results

---

## ✨ Key Features

### 🔐 Fully Private Bidding
- All bids encrypted using Zama's FHE technology
- No plaintext bid values ever exposed on-chain
- Bidders cannot see others' bids during auction

### 🛡️ Anti-Front-Running
- Encrypted bids prevent MEV exploitation
- No way to game the system by observing pending transactions
- True sealed-bid auction mechanics

### ⚡ Real-Time Updates
- Live auction countdown timers
- Instant bid confirmation (without revealing amount)
- Encrypted bid count display

### 🎨 Modern UI/UX
- Clean, minimalist design inspired by Linear
- Dark mode support with high contrast
- Responsive across all devices
- Toast notifications for all actions

### 🔍 Transparent Results
- Post-auction result viewing for authorized participants
- Clickable transaction links to Etherscan
- Decryption only after auction finalization

### 🧪 Comprehensive Testing
- Unit tests for all components
- Smart contract integration tests
- Full test coverage with Vitest and Hardhat

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | High-quality React components |
| **Wagmi v2** | Ethereum React hooks |
| **RainbowKit** | Wallet connection UI |
| **Viem** | TypeScript Ethereum library |
| **React Router** | Client-side routing |
| **Sonner** | Toast notifications |

### Smart Contracts
| Technology | Purpose |
|------------|---------|
| **Solidity 0.8.24** | Smart contract language |
| **Zama fhEVM** | Fully Homomorphic Encryption |
| **@fhevm/solidity** | FHE operations library |
| **Hardhat** | Development environment |
| **Ethers.js v5** | Ethereum interactions |

### Testing
| Technology | Purpose |
|------------|---------|
| **Vitest** | Fast unit test runner |
| **React Testing Library** | Component testing |
| **@testing-library/user-event** | User interaction simulation |
| **jsdom** | DOM environment for tests |
| **Hardhat** | Contract testing framework |
| **Chai** | Assertion library |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Vercel** | Frontend hosting |
| **Sepolia Testnet** | Ethereum test network |
| **GitHub Actions** | CI/CD (optional) |

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Wallet    │  │   Auction  │  │    Bid     │            │
│  │ Connection │  │    Grid    │  │   Dialog   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│         │                │                │                  │
│         └────────────────┴────────────────┘                  │
│                          │                                   │
│                   ┌──────▼──────┐                           │
│                   │  Wagmi v2   │                           │
│                   │  + Viem     │                           │
│                   └──────┬──────┘                           │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           │ RPC Calls
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   Sepolia Testnet                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │          SealedAuction Smart Contract              │     │
│  │                                                     │     │
│  │  ┌──────────────┐  ┌──────────────┐              │     │
│  │  │   Encrypted  │  │   Encrypted  │              │     │
│  │  │  Highest Bid │  │    Winner    │              │     │
│  │  │  (euint64)   │  │  (eaddress)  │              │     │
│  │  └──────────────┘  └──────────────┘              │     │
│  │                                                     │     │
│  │  ┌────────────────────────────────────────┐       │     │
│  │  │      FHE Operations (Zama fhEVM)       │       │     │
│  │  │  • FHE.lt() - Encrypted comparison     │       │     │
│  │  │  • FHE.select() - Confidential branch  │       │     │
│  │  │  • FHE.allow() - Permission control    │       │     │
│  │  └────────────────────────────────────────┘       │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

### Smart Contract Architecture

The `SealedAuction` contract is the core of the platform, implementing sealed-bid auction logic with FHE.

#### Contract Structure

```solidity
contract SealedAuction is SepoliaConfig {
    // Public state
    address public immutable seller;
    uint256 public immutable endTime;
    bool public ended;
    uint32 public bids;
    string public imageHash;

    // Encrypted state (FHE)
    euint64 private highestBidEnc;    // Encrypted highest bid
    eaddress private winnerEnc;        // Encrypted winner address

    // Access control
    mapping(address => bool) public canViewAfterEnd;
}
```

#### Key Functions

##### 1. **Constructor**
```solidity
constructor(uint256 biddingSeconds, address _seller, string memory _imageHash)
```
- Initializes auction with duration, seller, and NFT image hash
- Grants seller default viewing permissions
- Sets end time based on current block timestamp

##### 2. **placeBid**
```solidity
function placeBid(externalEuint64 bidCt, bytes calldata inputProof) external
```
- **Accepts encrypted bid** from bidder
- **Validates proof** using FHE.fromExternal()
- **Compares with current highest** using FHE.lt()
- **Updates winner** using FHE.select() (confidential branching)
- **Emits event** without revealing bid amount
- **No feedback returned** to maintain sealed nature

**FHE Operations Flow:**
```
Input: Encrypted Bid → Validate Proof → Compare with Highest
                                            ↓
                                    Is bid > highest?
                                    (FHE.lt operation)
                                            ↓
                              ┌─────────────┴─────────────┐
                              ↓                           ↓
                          Yes (ebool)                 No (ebool)
                              ↓                           ↓
                    FHE.select(bid)              FHE.select(highest)
                              ↓                           ↓
                    Update highestBidEnc           Keep highestBidEnc
                    Update winnerEnc              Keep winnerEnc
```

##### 3. **finalize**
```solidity
function finalize() external
```
- Marks auction as ended
- Grants seller decrypt permissions
- Can only be called after endTime
- Cannot be called twice

##### 4. **grantView**
```solidity
function grantView(address viewer) external onlySeller
```
- Allows seller to grant decryption rights to specific address
- Only works after auction finalization
- Uses FHE.allow() to set permissions

##### 5. **grantViewToAllBidders**
```solidity
function grantViewToAllBidders(address[] calldata bidders) external onlySeller
```
- Batch grant viewing permissions
- Useful for revealing results to all participants

##### 6. **View Functions**
```solidity
function highestBidCipher() external view returns (euint64)
function winnerCipher() external view returns (eaddress)
function getState() external view returns (bool, bool, uint256, uint32)
```
- Return encrypted ciphertexts (not plaintext values)
- Access control enforced
- Frontend decrypts using fhevmjs

---

### Frontend Architecture

#### Component Hierarchy

```
App.tsx
├── Navbar.tsx (Wallet connection, theme toggle)
├── Hero.tsx (Landing section with CTA)
├── HowItWorks.tsx (Feature explanation + demo video)
├── AuctionGrid.tsx (Container for auction cards)
│   └── AuctionCard.tsx (Individual auction display)
│       └── BidDialog.tsx (Encrypted bid submission)
└── Footer.tsx (Links and info)
```

#### Key Components

##### **AuctionCard.tsx**
- Displays auction details (title, image, countdown, bid count)
- Shows minimum bid requirement
- Triggers bid dialog on button click
- Real-time countdown timer

##### **BidDialog.tsx**
- **FHE Encryption Flow:**
  1. User enters bid amount
  2. Validates minimum bid
  3. Encrypts amount using fhevmjs
  4. Generates input proof
  5. Submits encrypted data to contract
  6. Shows toast notification with tx hash

```typescript
// FHE Encryption Process
const encryptedBid = await instance.encrypt64(bidAmountWei);
const inputProof = await instance.generateInputProof(...);

// Submit to contract
await writeContract({
  address: auctionAddress,
  abi: AUCTION_ABI,
  functionName: 'placeBid',
  args: [encryptedBid, inputProof]
});
```

##### **Wagmi Configuration**
```typescript
// src/config/wagmi.ts
const config = getDefaultConfig({
  appName: 'NFTPlaza',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20.16.0 or higher
- **npm**: v10.8.1 or higher
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for testing ([faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd NFTPlaza
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Sepolia RPC (required for contract deployment)
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Deployer private key (for contract deployment only)
PRIVATE_KEY=your_private_key_here

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

⚠️ **Never commit `.env` to version control!**

---

## 💻 Development

### Run Development Server

```bash
npm run dev
```

Opens at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

Output in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## 🧪 Testing

NFTPlaza includes comprehensive test coverage across frontend components and smart contracts.

### Frontend Tests (Vitest)

Run all tests in watch mode:
```bash
npm test
```

Run tests once (CI mode):
```bash
npm run test:run
```

Run with interactive UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

#### Test Files
- `tests/components/AuctionCard.test.tsx` - Auction card component tests
- `tests/components/Hero.test.tsx` - Hero section tests
- `tests/utils/format.test.ts` - Utility function tests

### Smart Contract Tests (Hardhat)

Run contract tests:
```bash
npm run test:contracts
```

#### Test Coverage
- ✅ Contract deployment
- ✅ Bid placement (encrypted)
- ✅ Auction finalization
- ✅ Access control (view permissions)
- ✅ State retrieval
- ✅ Edge cases and error conditions

Test file: `tests/contracts/SealedAuction.test.js`

### Test Documentation

For detailed testing guide, see [tests/README.md](./tests/README.md)

For comprehensive test summary, see [tests/TEST_SUMMARY.md](./tests/TEST_SUMMARY.md)

---

## 📦 Deployment

### Deploy Smart Contracts

1. **Compile contracts**
```bash
npx hardhat compile
```

2. **Deploy to Sepolia**
```bash
SEPOLIA_RPC_URL="https://ethereum-sepolia-rpc.publicnode.com" \
node scripts/deploy.cjs
```

3. **Update contract addresses**

Edit `src/config/contracts.ts` with deployed addresses:
```typescript
export const AUCTION_CONTRACTS = [
  {
    address: '0x...',
    name: 'Crypto Punk #3100',
    // ...
  },
  // ...
];
```

### Deploy Frontend (Vercel)

#### Automatic Deployment

Push to `main` branch triggers automatic deployment.

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Current deployment: [https://nftplaza.vercel.app](https://nftplaza.vercel.app)

---

## 📜 Smart Contract Details

### Contract: `SealedAuction`

**Network**: Sepolia Testnet
**Solidity Version**: 0.8.24
**License**: MIT

#### State Variables

| Variable | Type | Visibility | Description |
|----------|------|------------|-------------|
| `seller` | `address` | `public` | Auction creator/seller |
| `endTime` | `uint256` | `public` | Auction end timestamp |
| `ended` | `bool` | `public` | Finalization status |
| `bids` | `uint32` | `public` | Total bid count |
| `imageHash` | `string` | `public` | IPFS hash of NFT |
| `highestBidEnc` | `euint64` | `private` | Encrypted highest bid |
| `winnerEnc` | `eaddress` | `private` | Encrypted winner |
| `canViewAfterEnd` | `mapping` | `public` | View permissions |

#### Events

```solidity
event BidPlaced(address indexed bidder);
event Finalized(address seller);
```

#### Modifiers

```solidity
modifier onlySeller() {
    require(msg.sender == seller, "not seller");
    _;
}
```

#### Gas Optimization

- Uses `immutable` for constants (seller, endTime)
- Uses `uint32` for bid counter (sufficient for any auction)
- Minimal storage operations
- Efficient FHE operations

#### Security Features

- ✅ **No bid reveal before finalization**
- ✅ **Access control on decrypt functions**
- ✅ **Reentrancy protection** (no external calls)
- ✅ **Time-based validation**
- ✅ **Owner-only admin functions**

---

## 🔒 Security Considerations

### Smart Contract Security

1. **FHE Encryption**
   - All bids encrypted using Zama's audited FHE library
   - No plaintext values stored or emitted
   - Ciphertext handles used for all operations

2. **Access Control**
   - Seller-only functions protected by `onlySeller` modifier
   - View functions require explicit permission
   - Default permissions granted carefully

3. **Time Management**
   - Auction end time immutable after deployment
   - Time-based validations prevent early finalization
   - Block timestamp used (acceptable for auction use case)

4. **State Management**
   - Boolean flags prevent double-finalization
   - State transitions validated
   - No external calls during critical operations

### Frontend Security

1. **Wallet Connection**
   - RainbowKit handles secure wallet connection
   - No private key storage
   - Transaction signing done in wallet

2. **Input Validation**
   - Minimum bid validation
   - ETH amount parsing with proper decimals
   - User input sanitization

3. **API Security**
   - RPC calls through Wagmi/Viem
   - No direct private key exposure
   - Environment variables for sensitive data

### Best Practices

- ⚠️ **Never commit private keys**
- ⚠️ **Use Sepolia testnet for testing**
- ⚠️ **Audit contracts before mainnet**
- ⚠️ **Test with small amounts first**
- ⚠️ **Verify contract source on Etherscan**

---

## 🎨 UI/UX Design

### Design Philosophy

NFTPlaza follows a **minimalist, high-contrast design** inspired by Linear:

- **Clean Lines**: Simple, uncluttered interface
- **High Contrast**: Dark mode with vibrant accent colors
- **Typography**: Clear hierarchy with proper spacing
- **Motion**: Subtle animations for better UX
- **Accessibility**: WCAG 2.1 AA compliant

### Color Palette

```css
/* Primary Colors */
--primary: 220 90% 56%;      /* Blue */
--secondary: 280 100% 70%;   /* Purple */
--accent: 340 75% 55%;       /* Pink */

/* Neutral Colors */
--background: 220 20% 8%;    /* Dark background */
--foreground: 220 10% 95%;   /* Light text */
--card: 220 18% 12%;         /* Card background */
--border: 220 15% 20%;       /* Borders */
```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { /* ... */ }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { /* ... */ }

/* Desktop */
@media (min-width: 1025px) { /* ... */ }
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** rules
- Write **tests** for new features
- Update **documentation** as needed
- Use **conventional commits**

### Testing Requirements

- All new components must have tests
- Maintain >80% code coverage
- Contract changes require new test cases

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Live Demo**: [https://nftplaza.vercel.app](https://nftplaza.vercel.app)
- **Zama Documentation**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Sepolia Faucet**: [https://sepoliafaucet.com](https://sepoliafaucet.com)
- **Hardhat Docs**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **Wagmi Docs**: [https://wagmi.sh](https://wagmi.sh)

---

## 🙏 Acknowledgments

- **Zama** for the incredible fhEVM technology
- **shadcn/ui** for beautiful React components
- **RainbowKit** for seamless wallet integration
- **Vercel** for hosting platform

---

## 📞 Support

For questions or issues:

1. **Open an issue** on GitHub
2. **Check documentation** in `/tests` and `/docs`
3. **Review test files** for usage examples

---

<div align="center">

**Built with ❤️ using Zama FHE**

[⬆ Back to Top](#nftplaza---privacy-preserving-sealed-auction-platform)

</div>

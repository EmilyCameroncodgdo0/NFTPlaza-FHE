// Deployed SealedAuction contract addresses on Sepolia
export const AUCTION_ADDRESSES = [
  "0xD497337e766C294da42487CFBF2AcA80aB1FA5Db", // First auction (7 days)
  "0x3d356b2dab25230D08F6cAeb7272876707ca22e6", // Crypto Punk #3100 (7 days)
  "0x72EF9f21acD3351e7D1B4Ab6138bAb83333dd77D", // Bored Ape #8817 (5 days)
  "0x77cD2EbeEa9116664eC0eA962C93Fe23b2FbB362", // Azuki #9605 (3 days)
] as const;

export const SEALED_AUCTION_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "biddingSeconds", type: "uint256" },
      { internalType: "address", name: "_seller", type: "address" },
      { internalType: "string", name: "_imageHash", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "bidder", type: "address" }],
    name: "BidPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "seller", type: "address" }],
    name: "Finalized",
    type: "event",
  },
  {
    inputs: [],
    name: "bids",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "canViewAfterEnd",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ended",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getState",
    outputs: [
      { internalType: "bool", name: "isBidding", type: "bool" },
      { internalType: "bool", name: "isEnded", type: "bool" },
      { internalType: "uint256", name: "_endTime", type: "uint256" },
      { internalType: "uint32", name: "_bids", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "viewer", type: "address" }],
    name: "grantView",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "bidders", type: "address[]" }],
    name: "grantViewToAllBidders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "highestBidCipher",
    outputs: [{ internalType: "euint64", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "imageHash",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "externalEuint64", name: "bidCt", type: "bytes32" },
      { internalType: "bytes", name: "inputProof", type: "bytes" },
    ],
    name: "placeBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "seller",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerCipher",
    outputs: [{ internalType: "eaddress", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

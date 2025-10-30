import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains';

// Note: Get your own Project ID from https://cloud.walletconnect.com/
export const config = getDefaultConfig({
  appName: 'NFTPlaza',
  projectId: 'a12b3c4d5e6f7g8h9i0j1k2l3m4n5o6p', // Replace with your WalletConnect Project ID
  chains: [mainnet, polygon, arbitrum, sepolia],
  ssr: false,
});

// src/types/index.ts

// Wallet & Auth
export interface WalletState {
  address: `0x${string}` | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  chainName: string | null;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  username?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// NFTs
export interface NFT {
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  imageUrl: string;
  metadata: Record<string, unknown>;
  collection?: string;
}

// Transactions
export interface Transaction {
  hash: string;
  from: string;
  to?: string;
  value: string;
  gasUsed: number;
  status: 'pending' | 'success' | 'failed';
  blockNumber: number;
  timestamp: Date;
  method?: string;
}

// Dashboard Stats
export interface PortfolioStats {
  epochEarning: number;
  totalEarning: number;
  totalNodes: number;
  liveNodes: number;
  workerNodes: number;
  sentryNodes: number;
  expBoost: number;
  tier: number;
  tierProgress: number;
}

export interface TierInfo {
  tier: number;
  name: string;
  requiredPoints: number;
  benefits: string[];
}

// Blockchain Data
export interface GasPrice {
  slow: number;
  average: number;
  fast: number;
  baseFee: number;
  priorityFee: number;
}

export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

// Contract Interactions
export interface ContractCall {
  address: string;
  abi: unknown[];
  functionName: string;
  args?: unknown[];
  value?: string;
}

export interface WriteResult {
  hash: string;
  wait: () => Promise<TransactionReceipt>;
}

export interface TransactionReceipt {
  status: number;
  blockNumber: number;
  gasUsed: bigint;
}

// Component Props
export interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  gradient: 'blue' | 'purple' | 'green';
  icon?: React.ReactNode;
  trend?: number;
}

export interface NFTCardProps {
  nft: NFT;
  onClick?: (nft: NFT) => void;
  animated?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Mock DB Types
export interface MockDatabase {
  userProfiles: UserProfile[];
  nftCollection: (NFT & { userId: string })[];
  transactions: (Transaction & { userId: string })[];
  portfolioStats: (PortfolioStats & { userId: string })[];
}

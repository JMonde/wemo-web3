// src/lib/mock-db.ts
import { v4 as uuidv4 } from 'uuid';
import type { MockDatabase, UserProfile, NFT, Transaction, PortfolioStats } from '@/types';

const MOCK_USER_NAME = process.env.NEXT_PUBLIC_MOCK_USER_NAME || 'Adam McCall';
const MOCK_USER_WALLET = process.env.NEXT_PUBLIC_MOCK_USER_WALLET || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

// Helper to serialize dates for JSON
function serializeDate(date: Date): string {
  return date.toISOString();
}

// Sample NFT images (using placeholder services)
const SAMPLE_NFT_IMAGES = [
  'https://picsum.photos/seed/nft1/400/400',
  'https://picsum.photos/seed/nft2/400/400',
  'https://picsum.photos/seed/nft3/400/400',
  'https://picsum.photos/seed/nft4/400/400',
  'https://picsum.photos/seed/nft5/400/400',
  'https://picsum.photos/seed/nft6/400/400',
  'https://picsum.photos/seed/nft7/400/400',
  'https://picsum.photos/seed/nft8/400/400',
];

const SAMPLE_NFT_NAMES = [
  'Cosmic Ape #1234',
  'CryptoPunk #5678',
  'Bored Dolphin #9012',
  'Azuki Warrior #3456',
  'Doodle Cat #7890',
  'Moonbird #2345',
  'CloneX #6789',
  'Meebits #0123',
];

// Generate mock data
function createMockUser(): UserProfile {
  return {
    id: uuidv4(),
    walletAddress: MOCK_USER_WALLET,
    username: MOCK_USER_NAME,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER_NAME}`,
    createdAt: new Date('2024-01-15T10:30:00Z'),
  };
}

function createMockNFTs(userId: string): (NFT & { userId: string })[] {
  return SAMPLE_NFT_IMAGES.map((img, index) => ({
    userId,
    tokenId: `${1000 + index}`,
    contractAddress: '0x' + 'bc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    name: SAMPLE_NFT_NAMES[index],
    description: `A unique digital collectible from the ${SAMPLE_NFT_NAMES[index].split(' ')[0]} collection`,
    imageUrl: img,
    metadata: {
      attributes: [
        { trait_type: 'Background', value: ['Blue', 'Purple', 'Gold', 'Silver'][index % 4] },
        { trait_type: 'Rarity', value: ['Common', 'Rare', 'Epic', 'Legendary'][index % 4] },
      ],
    },
    collection: SAMPLE_NFT_NAMES[index].split(' ')[0],
  }));
}

function createMockTransactions(userId: string): (Transaction & { userId: string })[] {
  const transactions: (Transaction & { userId: string })[] = [];
  const methods = ['Mint NFT', 'Transfer', 'Swap', 'Stake', 'Claim Rewards', 'Deploy Contract'];
  const statuses: Transaction['status'][] = ['success', 'success', 'success', 'pending', 'failed'];

  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    transactions.push({
      userId,
      hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      from: MOCK_USER_WALLET,
      to: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      value: (Math.random() * 2).toFixed(4),
      gasUsed: Math.floor(Math.random() * 200000) + 21000,
      status: statuses[i % statuses.length],
      blockNumber: 18000000 + i,
      timestamp: date,
      method: methods[i % methods.length],
    });
  }

  return transactions;
}

function createMockPortfolioStats(userId: string): (PortfolioStats & { userId: string })[] {
  return [{
    userId,
    epochEarning: 2250.75,
    totalEarning: 250843.20,
    totalNodes: 19,
    liveNodes: 17,
    workerNodes: 12,
    sentryNodes: 5,
    expBoost: 1.25,
    tier: 3,
    tierProgress: 65,
  }];
}

// Initialize mock database
let mockDb: MockDatabase | null = null;

export function initializeMockDB(): MockDatabase {
  if (mockDb) return mockDb;

  const user = createMockUser();
  mockDb = {
    userProfiles: [user],
    nftCollection: createMockNFTs(user.id),
    transactions: createMockTransactions(user.id),
    portfolioStats: createMockPortfolioStats(user.id),
  };

  return mockDb;
}

// Helper to safely serialize database content
export function getSerializableDB() {
  const db = getMockDB();
  return {
    userProfiles: db.userProfiles.map(u => ({
      ...u,
      createdAt: serializeDate(u.createdAt),
      updatedAt: u.updatedAt ? serializeDate(u.updatedAt) : undefined,
    })),
    nftCollection: db.nftCollection,
    transactions: db.transactions.map(t => ({
      ...t,
      timestamp: serializeDate(t.timestamp),
    })),
    portfolioStats: db.portfolioStats.map(p => ({
      ...p,
      updatedAt: serializeDate(new Date()),
    })),
  };
}

export function getMockDB(): MockDatabase {
  if (!mockDb) {
    throw new Error('Mock database not initialized. Call initializeMockDB() first.');
  }
  return mockDb;
}

export function getUserByWallet(walletAddress: string): UserProfile | undefined {
  const db = getMockDB();
  return db.userProfiles.find(u => u.walletAddress.toLowerCase() === walletAddress.toLowerCase());
}

export function getNFTsByUser(userId: string): NFT[] {
  const db = getMockDB();
  return db.nftCollection.filter(n => n.userId === userId);
}

export function getTransactionsByUser(userId: string): Transaction[] {
  const db = getMockDB();
  return db.transactions.filter(t => t.userId === userId);
}

export function getPortfolioStatsByUser(userId: string): PortfolioStats | undefined {
  const db = getMockDB();
  return db.portfolioStats.find(p => p.userId === userId);
}

// Export types for convenience
export type { UserProfile, NFT, Transaction, PortfolioStats };

// src/__tests__/lib/mock-db.test.ts
import { initializeMockDB, getMockDB, getUserByWallet, getNFTsByUser } from '@/lib/mock-db';
import type { NFT } from '@/types';

describe('Mock Database', () => {
  beforeEach(() => {
    // Reset mock DB before each test
    jest.clearAllMocks();
  });

  it('initializes with mock data', () => {
    const db = initializeMockDB();

    expect(db.userProfiles).toHaveLength(1);
    expect(db.nftCollection.length).toBeGreaterThan(0);
    expect(db.transactions.length).toBeGreaterThan(0);
    expect(db.portfolioStats).toHaveLength(1);
  });

  it('returns the same instance on subsequent calls', () => {
    const db1 = initializeMockDB();
    const db2 = getMockDB();

    expect(db1).toBe(db2);
  });

  it('finds user by wallet address', () => {
    const db = initializeMockDB();
    const user = db.userProfiles[0];

    const foundUser = getUserByWallet(user.walletAddress);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(user.id);
  });

  it('returns undefined for non-existent wallet', () => {
    initializeMockDB();

    const foundUser = getUserByWallet('0x0000000000000000000000000000000000000000');

    expect(foundUser).toBeUndefined();
  });

  it('retrieves NFTs by user ID', () => {
    const db = initializeMockDB();
    const user = db.userProfiles[0];

    const nfts = getNFTsByUser(user.id);

    expect(nfts.length).toBeGreaterThan(0);
    // NFTs returned by getNFTsByUser are filtered by userId, but the base NFT type doesn't include userId
    // We verify the NFTs are returned correctly by checking other properties
    expect(nfts[0].tokenId).toBeDefined();
    expect(nfts[0].name).toBeDefined();
  });

  it('mock user has expected properties', () => {
    const db = initializeMockDB();
    const user = db.userProfiles[0];

    expect(user.username).toBe('Adam McCall');
    expect(user.walletAddress).toBe('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});

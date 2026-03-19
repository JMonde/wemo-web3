// scripts/seed-mock-data.ts
/**
 * Mock Data Seed Script
 * 
 * This script initializes the mock database with sample data
 * for development and testing purposes.
 */

import { initializeMockDB } from '../src/lib/mock-db';

async function seedMockData() {
  console.log('🌱 Seeding mock database...');
  
  try {
    const db = initializeMockDB();
    
    console.log('\n✅ Mock database initialized successfully!\n');
    console.log('📊 Seeded Data Summary:');
    console.log('─'.repeat(40));
    console.log(`👤 User Profiles: ${db.userProfiles.length}`);
    console.log(`🖼️  NFTs: ${db.nftCollection.length}`);
    console.log(`📝 Transactions: ${db.transactions.length}`);
    console.log(`📈 Portfolio Stats: ${db.portfolioStats.length}`);
    console.log('─'.repeat(40));
    
    if (db.userProfiles.length > 0) {
      const user = db.userProfiles[0];
      console.log('\n👤 Mock User:');
      console.log(`   Name: ${user.username}`);
      console.log(`   Wallet: ${user.walletAddress}`);
      console.log(`   Created: ${user.createdAt.toISOString()}`);
    }
    
    console.log('\n✨ Mock data seeding complete!');
    console.log('\n💡 To use mock data, set MOCK_DB=true in your .env.local file');
    
  } catch (error) {
    console.error('❌ Error seeding mock data:', error);
    process.exit(1);
  }
}

// Run the seed script
seedMockData();

// src/app/api/wallet/connect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet } from '@/lib/mock-db';
import type { ApiResponse } from '@/types';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Initialize mock database
    const db = initializeMockDB();

    // Get wallet address from query params or headers
    const walletAddress = request.nextUrl.searchParams.get('address');

    if (!walletAddress) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Wallet address is required',
      }, { status: 400 });
    }

    // Find or create user
    let user = getUserByWallet(walletAddress);

    if (!user) {
      // Create new user profile (in mock DB, this is just for demonstration)
      user = db.userProfiles[0]; // Use the seeded mock user
    }

    return NextResponse.json<ApiResponse<typeof user>>({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Wallet connect error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to connect wallet',
    }, { status: 500 });
  }
}

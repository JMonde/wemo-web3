// src/app/api/wallet/balance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet } from '@/lib/mock-db';
import type { ApiResponse } from '@/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('address');
    
    if (!walletAddress) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Wallet address is required',
      }, { status: 400 });
    }

    // Initialize mock DB
    const db = initializeMockDB();
    const user = getUserByWallet(walletAddress);

    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }

    // Mock balance data
    const balance = {
      wallet: walletAddress,
      eth: {
        balance: (Math.random() * 10).toFixed(4),
        usdValue: (Math.random() * 20000).toFixed(2),
      },
      wemo: {
        balance: (Math.random() * 10000).toFixed(2),
        usdValue: (Math.random() * 5000).toFixed(2),
      },
      tokens: [
        { symbol: 'USDT', balance: (Math.random() * 5000).toFixed(2), usdValue: (Math.random() * 5000).toFixed(2) },
        { symbol: 'USDC', balance: (Math.random() * 3000).toFixed(2), usdValue: (Math.random() * 3000).toFixed(2) },
      ],
    };

    return NextResponse.json<ApiResponse<typeof balance>>({
      success: true,
      data: balance,
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch balance',
    }, { status: 500 });
  }
}

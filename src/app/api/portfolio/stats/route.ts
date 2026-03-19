// src/app/api/portfolio/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet, getPortfolioStatsByUser } from '@/lib/mock-db';
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

    const db = initializeMockDB();
    const user = getUserByWallet(walletAddress);

    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }

    const stats = getPortfolioStatsByUser(user.id);

    if (!stats) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Portfolio stats not found',
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<typeof stats>>({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Portfolio stats error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch portfolio stats',
    }, { status: 500 });
  }
}

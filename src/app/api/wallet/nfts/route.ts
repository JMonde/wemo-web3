// src/app/api/wallet/nfts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet, getNFTsByUser } from '@/lib/mock-db';
import type { ApiResponse, PaginatedResponse } from '@/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('address');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

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

    const allNFTs = getNFTsByUser(user.id);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const nfts = allNFTs.slice(startIndex, endIndex);

    return NextResponse.json<PaginatedResponse<typeof nfts[0]>>({
      success: true,
      data: nfts,
      pagination: {
        page,
        limit,
        total: allNFTs.length,
        totalPages: Math.ceil(allNFTs.length / limit),
      },
    });
  } catch (error) {
    console.error('NFT fetch error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch NFTs',
    }, { status: 500 });
  }
}

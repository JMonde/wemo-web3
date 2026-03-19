// src/app/api/wallet/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet, getTransactionsByUser } from '@/lib/mock-db';
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

    const allTransactions = getTransactionsByUser(user.id);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const transactions = allTransactions.slice(startIndex, endIndex);

    return NextResponse.json<PaginatedResponse<typeof transactions[0]>>({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total: allTransactions.length,
        totalPages: Math.ceil(allTransactions.length / limit),
      },
    });
  } catch (error) {
    console.error('Transaction fetch error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch transactions',
    }, { status: 500 });
  }
}

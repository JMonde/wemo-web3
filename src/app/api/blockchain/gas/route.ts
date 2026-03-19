// src/app/api/blockchain/gas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, GasPrice } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Mock gas prices (in production, fetch from ETH gas station or similar)
    const gasPrices: GasPrice = {
      slow: Math.floor(Math.random() * 20) + 10,
      average: Math.floor(Math.random() * 30) + 25,
      fast: Math.floor(Math.random() * 50) + 40,
      baseFee: Math.floor(Math.random() * 15) + 10,
      priorityFee: Math.floor(Math.random() * 5) + 1,
    };

    return NextResponse.json<ApiResponse<GasPrice>>({
      success: true,
      data: gasPrices,
    });
  } catch (error) {
    console.error('Gas price fetch error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch gas prices',
    }, { status: 500 });
  }
}

// Update every 30 seconds
export const revalidate = 30;

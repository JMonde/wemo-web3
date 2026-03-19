// src/app/api/blockchain/prices/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, TokenPrice } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Mock token prices (in production, fetch from CoinGecko or CoinMarketCap)
    const prices: TokenPrice[] = [
      {
        symbol: 'ETH',
        price: 2000 + Math.random() * 500,
        change24h: (Math.random() - 0.5) * 10,
        marketCap: 240000000000,
        volume24h: 15000000000,
      },
      {
        symbol: 'WEMO',
        price: 0.5 + Math.random() * 0.2,
        change24h: (Math.random() - 0.5) * 15,
        marketCap: 50000000,
        volume24h: 5000000,
      },
      {
        symbol: 'BTC',
        price: 40000 + Math.random() * 5000,
        change24h: (Math.random() - 0.5) * 8,
        marketCap: 800000000000,
        volume24h: 30000000000,
      },
    ];

    return NextResponse.json<ApiResponse<TokenPrice[]>>({
      success: true,
      data: prices,
    });
  } catch (error) {
    console.error('Token price fetch error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch token prices',
    }, { status: 500 });
  }
}

// Update every 60 seconds
export const revalidate = 60;

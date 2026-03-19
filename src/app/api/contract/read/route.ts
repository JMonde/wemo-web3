// src/app/api/contract/read/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, abi, functionName, args } = body;

    if (!address || !functionName) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Contract address and function name are required',
      }, { status: 400 });
    }

    // Mock contract read responses
    const mockResponses: Record<string, unknown> = {
      'balanceOf': (Math.random() * 10000).toFixed(2),
      'totalSupply': '1000000000',
      'name': 'Wemo Token',
      'symbol': 'WEMO',
      'decimals': 18,
      'owner': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    };

    const response = mockResponses[functionName] || null;

    return NextResponse.json<ApiResponse<unknown>>({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Contract read error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to read contract',
    }, { status: 500 });
  }
}

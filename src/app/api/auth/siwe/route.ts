// src/app/api/auth/siwe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeMockDB, getUserByWallet } from '@/lib/mock-db';
import type { ApiResponse } from '@/types';

// Generate a nonce for SIWE
function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Mock SIWE message
function generateSiweMessage(address: string, nonce: string): string {
  return `localhost wants you to sign in with your Ethereum account:
${address}

I accept the Terms of Service: https://localhost/terms

URI: https://localhost
Version: 1
Chain ID: 1
Nonce: ${nonce}
Issued At: ${new Date().toISOString()}`;
}

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address');
    
    if (!address) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Address is required',
      }, { status: 400 });
    }

    const nonce = generateNonce();
    const message = generateSiweMessage(address, nonce);

    // Store nonce in session (in production, use Redis or similar)
    // For mock, we'll just return it
    return NextResponse.json<ApiResponse<{ nonce: string; message: string }>>({
      success: true,
      data: { nonce, message },
    });
  } catch (error) {
    console.error('SIWE nonce error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to generate nonce',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, signature, message } = body;

    if (!address || !signature || !message) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Address, signature, and message are required',
      }, { status: 400 });
    }

    // In production, verify the signature here
    // For mock, we'll just accept it
    
    const db = initializeMockDB();
    let user = getUserByWallet(address);

    if (!user) {
      // Create new user (use mock user for demo)
      user = db.userProfiles[0];
    }

    // Create session (in production, use JWT or session cookies)
    const session = {
      address,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json<ApiResponse<typeof session>>({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('SIWE verify error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to verify signature',
    }, { status: 500 });
  }
}

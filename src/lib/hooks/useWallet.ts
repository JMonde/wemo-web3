// src/lib/hooks/useWallet.ts
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { WalletState } from '@/types';
import { formatAddress } from '@/lib/utils';

const DEMO_WALLET_ADDRESS = '0xDemo742d35Cc6634C0532925a3b844Bc9e7595';
const DEMO_CHAIN_ID = 11155111;
const DEMO_CHAIN_NAME = 'Sepolia (Demo)';

// Unified wallet hook that works for both mock and real scenarios
export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    chainName: null,
  });
  const [isDemoMode, setIsDemoMode] = useState(false);

  const isMockRef = useRef(process.env.MOCK_DB === 'true' || process.env.NEXT_PUBLIC_MOCK_DB === 'true');

  const connect = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockAddress = (process.env.NEXT_PUBLIC_MOCK_USER_WALLET || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb') as `0x${string}`;

    setWalletState({
      address: mockAddress,
      isConnected: true,
      isConnecting: false,
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 11155111,
      chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Sepolia',
    });

    // Store in localStorage for persistence
    localStorage.setItem('wemo_wallet', JSON.stringify({
      address: mockAddress,
      connected: true,
      demoMode: false,
    }));
  }, []);

  const disconnect = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      chainName: null,
    });
    setIsDemoMode(false);
    localStorage.removeItem('wemo_wallet');
  }, []);

  const enableDemoMode = useCallback(() => {
    setWalletState({
      address: DEMO_WALLET_ADDRESS as `0x${string}`,
      isConnected: true,
      isConnecting: false,
      chainId: DEMO_CHAIN_ID,
      chainName: DEMO_CHAIN_NAME,
    });
    setIsDemoMode(true);
    
    // Store demo mode in localStorage
    localStorage.setItem('wemo_wallet', JSON.stringify({
      address: DEMO_WALLET_ADDRESS,
      connected: true,
      demoMode: true,
    }));
  }, []);

  const disableDemoMode = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      chainName: null,
    });
    setIsDemoMode(false);
    localStorage.removeItem('wemo_wallet');
  }, []);

  // Check for existing connection on mount
  useEffect(() => {
    const stored = localStorage.getItem('wemo_wallet');
    if (stored) {
      try {
        const { address, connected, demoMode } = JSON.parse(stored);
        if (connected && address) {
          if (demoMode) {
            setWalletState({
              address: address as `0x${string}`,
              isConnected: true,
              isConnecting: false,
              chainId: DEMO_CHAIN_ID,
              chainName: DEMO_CHAIN_NAME,
            });
            setIsDemoMode(true);
          } else {
            setWalletState({
              address: address as `0x${string}`,
              isConnected: true,
              isConnecting: false,
              chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 11155111,
              chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Sepolia',
            });
          }
        }
      } catch (e) {
        localStorage.removeItem('wemo_wallet');
      }
    }
  }, []);

  return {
    ...walletState,
    connect,
    disconnect,
    formattedAddress: walletState.address ? formatAddress(walletState.address) : null,
    isMock: isMockRef.current,
    isDemoMode,
    enableDemoMode,
    disableDemoMode,
  };
};

export default useWallet;

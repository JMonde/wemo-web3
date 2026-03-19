// src/components/Navbar.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';
import WalletButton from './WalletButton';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { isConnected } = useWallet();

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 w-full',
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg',
        'border-b border-gray-200 dark:border-gray-800',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-web3-violet to-web3-indigo flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-web3-violet to-web3-indigo bg-clip-text text-transparent">
              Wemo Web3
            </span>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#dashboard"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-web3-violet dark:hover:text-web3-violet transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#portfolio"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-web3-violet dark:hover:text-web3-violet transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#nodes"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-web3-violet dark:hover:text-web3-violet transition-colors"
            >
              Nodes
            </a>
            <a
              href="#rewards"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-web3-violet dark:hover:text-web3-violet transition-colors"
            >
              Rewards
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Network Indicator */}
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-web3-violet-50 dark:bg-web3-violet/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-web3-violet">
                  {process.env.NEXT_PUBLIC_CHAIN_NAME || 'Sepolia'}
                </span>
              </div>
            )}

            {/* Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

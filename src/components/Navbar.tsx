// src/components/Navbar.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';
import WalletButton from './WalletButton';

interface NavbarProps {
  className?: string;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Navbar({ className, onMenuToggle, isMobileMenuOpen }: NavbarProps) {
  const { isConnected, isDemoMode, disableDemoMode } = useWallet();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg',
        'border-b border-gray-200 dark:border-gray-800',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-web3-violet to-web3-indigo flex items-center justify-center shadow-md">
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
            <span className="text-xl font-bold bg-gradient-to-r from-web3-violet to-web3-indigo bg-clip-text text-transparent hidden sm:block">
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
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Demo Mode Indicator */}
            {isDemoMode && (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-web3-violet/10 to-web3-indigo/10 border border-web3-violet/20">
                <span className="w-2 h-2 rounded-full bg-web3-violet animate-pulse" />
                <span className="text-xs font-semibold text-web3-violet hidden sm:inline">
                  Demo
                </span>
                <button
                  onClick={disableDemoMode}
                  className="text-xs font-medium text-web3-violet hover:text-web3-violet/70 transition-colors ml-1"
                  title="Exit demo mode"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Network Indicator */}
            {isConnected && !isDemoMode && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-web3-violet-50 dark:bg-web3-violet/10 border border-web3-violet/20">
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

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {/* Demo Mode Indicator - Mobile */}
            {isDemoMode && (
              <div className="mx-4 flex items-center justify-between px-3 py-2 rounded-full bg-gradient-to-r from-web3-violet/10 to-web3-indigo/10 border border-web3-violet/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-web3-violet animate-pulse" />
                  <span className="text-xs font-semibold text-web3-violet">Demo Mode</span>
                </div>
                <button
                  onClick={disableDemoMode}
                  className="text-web3-violet hover:text-web3-violet/70 transition-colors"
                  aria-label="Exit demo mode"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <a
              href="#dashboard"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#portfolio"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#nodes"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Nodes
            </a>
            <a
              href="#rewards"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Rewards
            </a>
            {!isDemoMode && isConnected && (
              <div className="mx-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-full bg-web3-violet-50 dark:bg-web3-violet/10 border border-web3-violet/20 w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-web3-violet">
                  {process.env.NEXT_PUBLIC_CHAIN_NAME || 'Sepolia'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// src/components/WalletButton.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';
import { motion } from 'framer-motion';
import WalletConnect from './WalletConnect';

interface WalletButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export function WalletButton({ className, variant = 'default' }: WalletButtonProps) {
  const { isConnected, isConnecting, formattedAddress, connect, disconnect } = useWallet();
  const [showConnectModal, setShowConnectModal] = React.useState(false);

  const variantClasses = {
    default: 'bg-gradient-to-r from-web3-violet to-web3-indigo text-white hover:shadow-lg hover:shadow-web3-violet/25',
    outline: 'border-2 border-web3-violet text-web3-violet hover:bg-web3-violet/10',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      setShowConnectModal(true);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        disabled={isConnecting}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          className
        )}
        whileHover={{ scale: isConnected ? 1.02 : 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {isConnecting ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Connecting...</span>
          </>
        ) : isConnected ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono">{formattedAddress}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Connect Wallet</span>
          </>
        )}
      </motion.button>

      {/* Wallet Connect Modal */}
      <WalletConnect
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={() => {
          connect();
          setShowConnectModal(false);
        }}
      />
    </>
  );
}

export default WalletButton;

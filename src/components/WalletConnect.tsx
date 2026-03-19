// src/components/WalletConnect.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Modal from './ui/Modal';
import { motion } from 'framer-motion';

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const walletProviders = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Connect with your MetaMask wallet',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
        <path d="M29.006 10.858l-2.92-1.288-.796-4.946a.75.75 0 00-1.253-.43l-2.8 2.453-4.74-1.73a.75.75 0 00-.514 0l-4.74 1.73-2.8-2.453a.75.75 0 00-1.254.43l-.796 4.946-2.92 1.288a.75.75 0 00-.437.97l1.92 5.546a.75.75 0 00.97.437l2.92-1.288 2.8 2.453a.75.75 0 001.254-.43l.796-4.946 4.74-1.73 4.74 1.73.796 4.946a.75.75 0 001.254.43l2.8-2.453 2.92 1.288a.75.75 0 00.97-.437l1.92-5.546a.75.75 0 00-.437-.97z" />
      </svg>
    ),
    color: '#F6851B',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: 'Scan QR code with your wallet',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
    color: '#3B99FC',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'Connect with Coinbase Wallet',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="16" r="14" />
        <path d="M16 8a8 8 0 100 16 8 8 0 000-16z" fill="#fff" />
      </svg>
    ),
    color: '#0052FF',
  },
];

export function WalletConnect({ isOpen, onClose, onConnect }: WalletConnectProps) {
  const [selectedWallet, setSelectedWallet] = React.useState<string | null>(null);

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId);
    // Simulate connection
    setTimeout(() => {
      onConnect();
      setSelectedWallet(null);
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connect Wallet"
      description="Choose your preferred wallet to connect"
      size="md"
    >
      <div className="space-y-3">
        {walletProviders.map((wallet) => (
          <motion.button
            key={wallet.id}
            onClick={() => handleConnect(wallet.id)}
            disabled={selectedWallet !== null}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200',
              'hover:border-web3-violet hover:shadow-lg hover:shadow-web3-violet/10',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              selectedWallet === wallet.id
                ? 'border-web3-violet bg-web3-violet/5'
                : 'border-gray-200 dark:border-gray-700'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${wallet.color}20`, color: wallet.color }}
            >
              {wallet.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {wallet.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {wallet.description}
              </p>
            </div>
            {selectedWallet === wallet.id && (
              <div className="w-5 h-5 border-2 border-web3-violet border-t-transparent rounded-full animate-spin" />
            )}
          </motion.button>
        ))}
      </div>

      <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
        By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
      </p>
    </Modal>
  );
}

export default WalletConnect;

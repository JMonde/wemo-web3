// src/components/DashboardLayout.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import { useWallet } from '@/lib/hooks/useWallet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { isConnected, isConnecting } = useWallet();

  // Show loading state while connecting
  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-web3-violet-50 to-web3-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-web3-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Connecting to blockchain...</p>
        </div>
      </div>
    );
  }

  // Show connect prompt if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-web3-violet-50 to-web3-indigo-100">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-web3-violet to-web3-indigo flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Connect your Web3 wallet to access the dashboard and manage your crypto portfolio.
          </p>
          <div className="w-16 h-16 border-4 border-web3-violet border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-web3-violet-50 via-web3-indigo-50 to-web3-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-60',
          className
        )}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;

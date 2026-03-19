// src/components/DashboardLayout.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';
import { useWallet } from '@/lib/hooks/useWallet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isConnected, isConnecting, isDemoMode, enableDemoMode } = useWallet();
  const [isMounted, setIsMounted] = React.useState(false);
  const [showConnectAlert, setShowConnectAlert] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Show alert if not connected after mount
    if (isMounted && !isConnected) {
      setShowConnectAlert(true);
    }
  }, [isMounted, isConnected]);

  // Close mobile menu on route change or resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show loading state only while actively connecting
  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-web3-violet-50 via-web3-indigo-50 to-web3-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center px-4">
          <div className="w-16 h-16 border-4 border-web3-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Connecting to blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-web3-violet-50 via-web3-indigo-50 to-web3-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Navbar */}
      <Navbar 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          'md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        )}
      >
        <Sidebar collapsed={false} onToggle={() => setIsMobileMenuOpen(false)} isMobile />
      </div>

      {/* Connect Wallet Alert */}
      {showConnectAlert && !isConnected && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-amber-50 dark:bg-amber-900/90 border border-amber-200 dark:border-amber-700 rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-amber-800 dark:text-amber-200">
                  Wallet Not Connected
                </h3>
                <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Connect your wallet or try demo mode to explore the dashboard with fictional data.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={enableDemoMode}
                    className="flex-1 px-4 py-2.5 bg-web3-violet text-white text-sm font-semibold rounded-xl hover:bg-web3-violet/90 transition-colors shadow-lg"
                  >
                    Try Demo Mode
                  </button>
                  <button
                    onClick={() => setShowConnectAlert(false)}
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowConnectAlert(false)}
                className="flex-shrink-0 text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200 transition-colors"
                aria-label="Close alert"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300',
          'md:ml-60',
          sidebarCollapsed && 'md:ml-16',
          className
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;

// src/components/dashboard/ReferralWidget.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ReferralWidgetProps {
  className?: string;
  referralCode?: string;
  referrals?: number;
  earnings?: number;
}

// Simple toast notification without requiring provider
const showToast = (message: string, type: 'success' | 'error') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 transform translate-y-0 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

export function ReferralWidget({
  className,
  referralCode = 'ADAM2024',
  referrals = 12,
  earnings = 1250.50,
}: ReferralWidgetProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      showToast('Referral code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('Failed to copy code', 'error');
    }
  };

  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/ref/${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      showToast('Referral link copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy link', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg',
        'border border-gray-100 dark:border-gray-800',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          Refer & Earn
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Share your code and earn rewards
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-web3-violet/10 to-web3-indigo/10">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {referrals}
          </p>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
          <p className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
            ${earnings.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Your Referral Code
        </label>
        <div className="flex gap-2">
          <div className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <p className="text-base sm:text-lg font-mono font-bold text-center text-web3-violet truncate">
              {referralCode}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              'px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all flex-shrink-0',
              copied
                ? 'bg-green-500 text-white'
                : 'bg-web3-violet text-white hover:bg-web3-violet/90'
            )}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4 sm:mb-6">
        <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Referral Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate"
          />
          <button
            onClick={handleCopyLink}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium bg-web3-violet text-white hover:bg-web3-violet/90 transition-all flex-shrink-0 text-sm"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="p-3 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-2 sm:gap-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300">
              Reward Structure
            </p>
            <ul className="text-xs text-amber-700 dark:text-amber-400 mt-1 space-y-1">
              <li>• 10% of referee&apos;s first deposit</li>
              <li>• 5% ongoing trading fees</li>
              <li className="hidden sm:block">• Bonus NFT at 10 referrals</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReferralWidget;

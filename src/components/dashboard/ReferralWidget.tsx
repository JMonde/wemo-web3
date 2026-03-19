// src/components/dashboard/ReferralWidget.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

interface ReferralWidgetProps {
  className?: string;
  referralCode?: string;
  referrals?: number;
  earnings?: number;
}

export function ReferralWidget({
  className,
  referralCode = 'ADAM2024',
  referrals = 12,
  earnings = 1250.50,
}: ReferralWidgetProps) {
  const { success, error } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      success('Referral code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      error('Failed to copy code');
    }
  };

  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/ref/${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      success('Referral link copied to clipboard!');
    } catch (err) {
      error('Failed to copy link');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg',
        'border border-gray-100 dark:border-gray-800',
        className
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Refer & Earn
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Share your code and earn rewards
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-web3-violet/10 to-web3-indigo/10">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {referrals}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            ${earnings.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Your Referral Code
        </label>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <p className="text-lg font-mono font-bold text-center text-web3-violet">
              {referralCode}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              'px-4 py-3 rounded-xl font-medium transition-all',
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
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Referral Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 truncate"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 rounded-xl font-medium bg-web3-violet text-white hover:bg-web3-violet/90 transition-all"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Reward Structure
            </p>
            <ul className="text-xs text-amber-700 dark:text-amber-400 mt-1 space-y-1">
              <li>• 10% of referee&apos;s first deposit</li>
              <li>• 5% ongoing trading fees</li>
              <li>• Bonus NFT at 10 referrals</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReferralWidget;

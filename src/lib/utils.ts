// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  const prefix = address.slice(0, chars + 2);
  const suffix = address.slice(-chars);
  return `${prefix}...${suffix}`;
}

export function formatNumber(num: number, decimals = 2): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
}

export function formatCurrency(num: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function getExplorerUrl(txHash: string): string {
  const explorerUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://sepolia.etherscan.io';
  return `${explorerUrl}/tx/${txHash}`;
}

export function calculateTierProgress(currentTier: number, currentPoints: number): number {
  const tierThresholds = [0, 1000, 5000, 15000, 50000, 100000];
  const currentThreshold = tierThresholds[currentTier - 1] || 0;
  const nextThreshold = tierThresholds[currentTier] || 100000;
  const progress = ((currentPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return Math.min(100, Math.max(0, progress));
}

export function getTierInfo(tier: number) {
  const tiers = [
    { tier: 1, name: 'Bronze', requiredPoints: 0, benefits: ['Basic rewards', 'Community access'] },
    { tier: 2, name: 'Silver', requiredPoints: 1000, benefits: ['2x rewards', 'Priority support', 'Exclusive NFTs'] },
    { tier: 3, name: 'Gold', requiredPoints: 5000, benefits: ['3x rewards', 'Dedicated manager', 'Early access'] },
    { tier: 4, name: 'Platinum', requiredPoints: 15000, benefits: ['5x rewards', 'VIP events', 'Governance rights'] },
    { tier: 5, name: 'Diamond', requiredPoints: 50000, benefits: ['10x rewards', 'Custom benefits', 'Lifetime status'] },
  ];
  return tiers[tier - 1] || tiers[tiers.length - 1];
}

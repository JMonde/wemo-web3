// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnimatedBackground } from '@/components/3d/AnimatedBackground';
import { Toaster } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wemo Web3 Dashboard | Unlock the Power of Crypto',
  description: 'Manage your nodes, track earnings, and grow your crypto portfolio with our comprehensive Web3 dashboard.',
  keywords: ['web3', 'crypto', 'dashboard', 'blockchain', 'defi', 'nft'],
  authors: [{ name: 'Wemo Web3' }],
  openGraph: {
    title: 'Wemo Web3 Dashboard',
    description: 'Unlock the Power of Crypto',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="wemo-theme">
          <AnimatedBackground variant="gradient" />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

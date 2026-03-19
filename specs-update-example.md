# Specifications: Web3 Dashboard & Interactive Portal

## Overview

A Next.js Web3 Dashboard and Interactive Portal that provides users with:
- 📲 **Wallet Integration** — Connect MetaMask, WalletConnect, Coinbase Wallet, and other Web3 wallets
- 🔗 **Smart Contract Interactions** — Token balance checking, NFT minting, transaction execution
- 🧑💻 **Project Showcase** — NFT gallery, DeFi widgets, blockchain project demonstrations
- 📈 **Live Blockchain Data** — Real-time gas fees, price feeds, transaction history
- 🎨 **Immersive UI/UX** — Smooth animations, 3D elements, modern gradient-based design inspired by Fynex-style dashboards

The design aesthetic follows the reference screenshots:
- **Color Palette**: Soft lavender/purple gradients (#E8E4F5, #C4B5FD, #8B5CF6)
- **Cards**: White/light backgrounds with subtle shadows and rounded corners (16-24px radius)
- **Floating Elements**: Crypto icons (ETH, BTC, etc.) with gentle floating animations
- **Typography**: Clean sans-serif with bold headings and readable body text
- **Dashboard Layout**: Sidebar navigation + main content area with stat cards and charts
- **Buttons**: Gradient-filled primary buttons with hover glow effects

---

## New Features to Add

### 1. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/wallet/connect` | Initialize wallet connection session |
| `GET` | `/api/wallet/balance` | Fetch wallet balance and token holdings |
| `GET` | `/api/wallet/nfts` | Fetch NFTs owned by connected wallet |
| `GET` | `/api/wallet/transactions` | Fetch transaction history |
| `POST` | `/api/contract/read` | Execute read-only contract calls |
| `POST` | `/api/contract/write` | Execute write transactions to contracts |
| `GET` | `/api/blockchain/gas` | Fetch current gas prices |
| `GET` | `/api/blockchain/prices` | Fetch token price feeds |
| `POST` | `/api/auth/siwe` | Sign-In with Ethereum authentication |
| `GET` | `/api/portfolio/stats` | Fetch portfolio statistics and charts |

### 2. Database Schema (Mock DB Compatible)

```sql
-- User Profiles (for mock auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  username VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NFT Gallery Cache
CREATE TABLE nft_collection (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  token_id VARCHAR(255) NOT NULL,
  contract_address VARCHAR(42) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  image_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transaction History
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  tx_hash VARCHAR(66) UNIQUE NOT NULL,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42),
  value DECIMAL(78, 18),
  gas_used INTEGER,
  status VARCHAR(20),
  block_number INTEGER,
  timestamp TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio Stats (for dashboard widgets)
CREATE TABLE portfolio_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  epoch_earning DECIMAL(78, 18) DEFAULT 0,
  total_earning DECIMAL(78, 18) DEFAULT 0,
  total_nodes INTEGER DEFAULT 0,
  live_nodes INTEGER DEFAULT 0,
  worker_nodes INTEGER DEFAULT 0,
  sentry_nodes INTEGER DEFAULT 0,
  exp_boost DECIMAL(5, 2) DEFAULT 0,
  tier INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Mock Data Seed (for MOCK_DB=true)
-- Seeds sample user: "Adam McCall" with wallet 0x1234...5678
-- Sample NFTs, transactions, and portfolio stats
```

### 3. UI Components

#### Layout Components
| Component | Path | Description |
|-----------|------|-------------|
| `RootLayout` | `app/layout.tsx` | Wagmi/RainbowKit providers, theme context |
| `Navbar` | `components/Navbar.tsx` | Top navigation with logo, menu, wallet button |
| `Sidebar` | `components/Sidebar.tsx` | Collapsible sidebar with navigation menu |
| `DashboardLayout` | `components/DashboardLayout.tsx` | Main dashboard wrapper with sidebar + content |

#### Wallet & Auth Components
| Component | Path | Description |
|-----------|------|-------------|
| `WalletConnect` | `components/WalletConnect.tsx` | Wallet connection modal with provider selection |
| `WalletButton` | `components/WalletButton.tsx` | Connect/disconnect button with address display |
| `SIWEModal` | `components/auth/SIWEModal.tsx` | Sign-In with Ethereum signature modal |

#### Dashboard Widgets
| Component | Path | Description |
|-----------|------|-------------|
| `StatCard` | `components/dashboard/StatCard.tsx` | Gradient stat card (Epoch/Total Earnings) |
| `EarningStatistics` | `components/dashboard/EarningStatistics.tsx` | Line chart with earning trends |
| `NodeStatus` | `components/dashboard/NodeStatus.tsx` | Node count table (Total/Live/Worker/Sentry) |
| `AchievementTiers` | `components/dashboard/AchievementTiers.tsx` | Progress bar showing tier progression |
| `ReferralWidget` | `components/dashboard/ReferralWidget.tsx` | Referral code display and copy functionality |

#### Web3 Interaction Components
| Component | Path | Description |
|-----------|------|-------------|
| `TokenBalance` | `components/web3/TokenBalance.tsx` | Display token balances with price conversion |
| `NFTGallery` | `components/web3/NFTGallery.tsx` | Grid of NFT cards with hover animations |
| `NFTCard` | `components/web3/NFTCard.tsx` | Individual NFT card with flip animation |
| `TransactionList` | `components/web3/TransactionList.tsx` | Recent transactions with status badges |
| `ContractInteraction` | `components/web3/ContractInteraction.tsx` | Form for minting/sending tokens |
| `GasWidget` | `components/web3/GasWidget.tsx` | Live gas price display with chart |
| `PriceFeed` | `components/web3/PriceFeed.tsx` | Token price ticker widget |

#### 3D & Animation Components
| Component | Path | Description |
|-----------|------|-------------|
| `Hero3D` | `components/3d/Hero3D.tsx` | Three.js 3D coin/token animation |
| `FloatingIcons` | `components/3d/FloatingIcons.tsx` | Floating crypto icons with parallax |
| `AnimatedBackground` | `components/3d/AnimatedBackground.tsx` | Gradient mesh background with motion |
| `PageTransition` | `components/animations/PageTransition.tsx` | Framer Motion page transitions |

#### Utility Components
| Component | Path | Description |
|-----------|------|-------------|
| `ThemeProvider` | `components/ThemeProvider.tsx` | Light/dark mode toggle |
| `LoadingSpinner` | `components/ui/LoadingSpinner.tsx` | Blockchain-themed loading animation |
| `Toast` | `components/ui/Toast.tsx` | Transaction status notifications |
| `Modal` | `components/ui/Modal.tsx` | Reusable modal wrapper |

### 4. TypeScript Types

```typescript
// Wallet & Auth
interface WalletState {
  address: `0x${string}` | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  chainName: string | null;
}

interface UserProfile {
  id: string;
  walletAddress: string;
  username?: string;
  avatarUrl?: string;
  createdAt: Date;
}

// NFTs
interface NFT {
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  imageUrl: string;
  metadata: Record<string, unknown>;
  collection?: string;
}

// Transactions
interface Transaction {
  hash: string;
  from: string;
  to?: string;
  value: string;
  gasUsed: number;
  status: 'pending' | 'success' | 'failed';
  blockNumber: number;
  timestamp: Date;
  method?: string;
}

// Dashboard Stats
interface PortfolioStats {
  epochEarning: number;
  totalEarning: number;
  totalNodes: number;
  liveNodes: number;
  workerNodes: number;
  sentryNodes: number;
  expBoost: number;
  tier: number;
  tierProgress: number;
}

interface TierInfo {
  tier: number;
  name: string;
  requiredPoints: number;
  benefits: string[];
}

// Blockchain Data
interface GasPrice {
  slow: number;
  average: number;
  fast: number;
  baseFee: number;
  priorityFee: number;
}

interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

// Contract Interactions
interface ContractCall {
  address: string;
  abi: AbiItem[];
  functionName: string;
  args?: unknown[];
  value?: string;
}

interface WriteResult {
  hash: string;
  wait: () => Promise<TransactionReceipt>;
}

// Component Props
interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  gradient: 'blue' | 'purple' | 'green';
  icon?: React.ReactNode;
  trend?: number;
}

interface NFTCardProps {
  nft: NFT;
  onClick?: (nft: NFT) => void;
  animated?: boolean;
}
```

---

## Requirements

### Mock Implementation (CRITICAL)
- **MOCK_DB=true**: All features must work with mock database in development
- **Mock Auth**: Use mock user profile from localStorage (simulate "Adam McCall" from screenshots)
- **Mock Data**: Seed script creates realistic sample data:
  - Sample wallet: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
  - Sample NFTs: 6-8 NFTs with placeholder images
  - Sample transactions: 10-15 recent transactions
  - Sample stats: Epoch Earning ~2,250, Total Earning ~250, 19 total nodes
- **Mock Wallet**: Simulate wallet connection without actual MetaMask for testing
- **No Production Changes**: Do not modify production configurations

### Testing Requirements
- **API Tests**: Test all new endpoints with mock DB (Jest + Supertest)
- **Component Tests**: Test all new/modified components (React Testing Library)
- **Integration Tests**: Test full user flows (wallet connect → view dashboard → interact)
- **E2E Tests**: Playwright tests for critical paths
- **Coverage**: Minimum 70% for new functionality

### Design Requirements (Based on Reference Screenshots)
- **Color Scheme**:
  - Primary: `#8B5CF6` (violet-500)
  - Secondary: `#6366F1` (indigo-500)
  - Background: `#F5F3FF` (violet-50) to `#E0E7FF` (indigo-100) gradient
  - Cards: White with `shadow-lg` and `rounded-2xl`
  
- **Typography**:
  - Headings: `font-bold`, `text-4xl` for hero, `text-2xl` for section titles
  - Body: `text-gray-700`, `leading-relaxed`
  
- **Animations** (Framer Motion):
  - Floating crypto icons: `animate-bounce` with custom keyframes (2-3s duration)
  - Card hover: `scale-105`, `shadow-xl` transition
  - Page transitions: Fade in/out with slide
  - Stat count-up: Animated number increment on mount
  - Chart animations: Smooth line drawing with gradient fill
  
- **Layout**:
  - Hero section: Centered headline with floating icons around
  - Dashboard: Sidebar (240px) + main content area
  - Stat cards: 2-column grid on mobile, 4-column on desktop
  - Charts: Full-width card with gradient area chart

---

## Acceptance Criteria

### Backend/API
- [ ] All endpoints respond correctly with mock data
- [ ] SIWE authentication flow works end-to-end
- [ ] Contract read/write operations execute properly
- [ ] Real-time gas price updates via WebSocket/polling
- [ ] API tests pass with >90% success rate
- [ ] Rate limiting implemented for public endpoints

### Frontend
- [ ] Wallet connect modal displays all major providers
- [ ] Dashboard matches reference design (Fynex-style)
- [ ] Stat cards show correct gradient styling
- [ ] NFT gallery displays with hover/flip animations
- [ ] Transaction list shows status badges correctly
- [ ] 3D hero component renders without errors
- [ ] Floating icons animate smoothly
- [ ] Responsive design works on mobile/tablet
- [ ] Light/dark theme toggle functions
- [ ] Works with MOCK_DB=true (no real wallet required for testing)

### Animations & Visual Effects
- [ ] Page transitions are smooth (Framer Motion)
- [ ] Stat numbers count up on dashboard load
- [ ] Chart lines animate on mount
- [ ] Floating icons have parallax effect
- [ ] Button hover states have glow effects
- [ ] NFT cards flip/hover animate
- [ ] Loading states show blockchain-themed spinners

### Code Quality
- [ ] TypeScript strict mode enabled
- [ ] No ESLint errors or warnings
- [ ] No console errors in browser
- [ ] Test coverage > 70% for new code
- [ ] All components have prop types defined
- [ ] Proper error boundaries implemented
- [ ] Accessibility (ARIA labels, keyboard navigation)

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (gzipped)
- [ ] Images optimized (WebP, lazy loading)

---

## Verification Steps

### 1. Initial Setup Verification
```bash
# Install dependencies
npm install

# Run mock data seed
npm run db:seed

# Start development server
npm run dev
```

### 2. Wallet Connection Test
1. Navigate to homepage
2. Click "Connect Wallet" button
3. Select "MetaMask" (or mock wallet)
4. Verify wallet address displays in navbar
5. Verify dashboard unlocks

### 3. Dashboard Visual Test
1. After wallet connect, verify dashboard matches reference:
   - [ ] Hero text: "Unlock the Power of Crypto..."
   - [ ] Floating crypto icons (ETH, BTC, etc.) visible
   - [ ] Sidebar menu with Dashboard, Node Management, Portfolio, etc.
   - [ ] Stat cards: Epoch Earning (~2,250), Total Earning (~250)
   - [ ] Earning Statistics chart displays
   - [ ] Node Status table shows counts
   - [ ] Achievement Tiers progress bar visible

### 4. Animation Test
1. Observe floating icons — should gently float/bounce
2. Hover over stat cards — should scale and shadow
3. Check page transitions — should fade/slide
4. Verify stat numbers count up on load
5. Check chart animation on mount

### 5. NFT Gallery Test
1. Navigate to Portfolio/NFT Gallery
2. Verify grid of NFT cards displays
3. Hover over cards — should flip/animate
4. Click card — should show details modal

### 6. Contract Interaction Test
1. Navigate to Contract Interaction page
2. Enter mint quantity
3. Click "Mint NFT"
4. Verify transaction modal appears
5. Verify success notification on completion

### 7. Mock DB Test
```bash
# Set mock mode
export MOCK_DB=true
npm run dev

# Verify all features work without real blockchain
# Verify mock user "Adam McCall" appears
# Verify mock stats match screenshots
```

### 8. Test Suite Verification
```bash
# Run all tests
npm test

# Check coverage
npm run test:coverage

# Verify >70% coverage
```

### 9. Responsive Design Test
1. Test on desktop (1920x1080)
2. Test on tablet (768x1024)
3. Test on mobile (375x667)
4. Verify sidebar collapses on mobile
5. Verify cards stack properly

### 10. Theme Toggle Test
1. Click theme toggle in sidebar
2. Verify dark mode activates
3. Verify all components adapt colors
4. Verify preference persists in localStorage

---

## Important Notes

### DO
- ✅ Use mock data for all development and testing
- ✅ Implement SIWE for production authentication
- ✅ Use Wagmi + RainbowKit for wallet management
- ✅ Use Framer Motion for all animations
- ✅ Use Three.js / React Three Fiber for 3D elements
- ✅ Follow the Fynex design aesthetic from screenshots
- ✅ Implement gradient backgrounds and floating icons
- ✅ Add smooth transitions between all states
- ✅ Test thoroughly with MOCK_DB=true
- ✅ Write comprehensive tests for all new features

### DO NOT
- ❌ Modify production configurations
- ❌ Break existing functionality
- ❌ Skip animation implementations
- ❌ Use generic UI components without customization
- ❌ Forget to add loading states
- ❌ Ignore mobile responsiveness
- ❌ Deploy without testing with mock data first

### Design Reference Summary (from screenshots)
The design should replicate the Fynex dashboard shown in the reference:
- **Hero Section**: Large centered headline with gradient background, floating crypto icons
- **Dashboard Panel**: White card with rounded corners, subtle shadow
- **Stat Cards**: Two-tone gradient (blue to purple) with large numbers
- **Sidebar**: Minimal with icons, light background, collapsible
- **Charts**: Gradient area charts with smooth curves
- **Overall Feel**: Clean, modern, professional with playful animated elements

---

## Questions for User

### Critical Questions (Block Implementation)

1. **Smart Contract Deployment**: Do you have existing smart contracts to integrate, or should I create sample contracts (ERC20, ERC721) for demonstration purposes?

2. **Blockchain Network**: Which testnet should be the default for development? (Sepolia, Mumbai, or local Hardhat node?)

3. **3D Assets**: Should I use procedurally generated 3D shapes (coins, tokens) or do you have specific 3D models to provide?

4. **NFT Data Source**: Should NFTs be fetched from a specific marketplace API (OpenSea, Rarible) or use mock/sample NFT data?

5. **Backend Database**: For production, should I set up PostgreSQL, MongoDB, or keep it file-based with SQLite?

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Project scaffolding with Next.js 14
- [ ] Wagmi + RainbowKit setup
- [ ] Tailwind + Shadcn UI configuration
- [ ] Mock database implementation
- [ ] Basic layout components (Navbar, Sidebar)

### Phase 2: Core Features (Week 2)
- [ ] Wallet connection flow
- [ ] Dashboard stat cards
- [ ] Earning statistics chart
- [ ] Node status widget
- [ ] Achievement tiers component

### Phase 3: Web3 Integration (Week 3)
- [ ] Smart contract read/write hooks
- [ ] Token balance display
- [ ] Transaction list component
- [ ] Gas price widget
- [ ] Price feed integration

### Phase 4: NFT Gallery (Week 4)
- [ ] NFT fetching logic
- [ ] NFT card component with animations
- [ ] Gallery grid layout
- [ ] NFT detail modal

### Phase 5: 3D & Animations (Week 5)
- [ ] Three.js hero component
- [ ] Floating crypto icons
- [ ] Animated background
- [ ] Page transitions
- [ ] Micro-interactions

### Phase 6: Polish & Testing (Week 6)
- [ ] Responsive design fixes
- [ ] Theme toggle implementation
- [ ] Test suite completion
- [ ] Performance optimization
- [ ] Documentation

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "wagmi": "^1.4.0",
    " @rainbow-me/rainbowkit": "^1.3.0",
    "viem": "^1.19.0",
    "ethers": "^6.9.0",
    "framer-motion": "^10.16.0",
    "three": "^0.160.0",
    " @react-three/fiber": "^8.15.0",
    " @react-three/drei": "^9.96.0",
    "recharts": "^2.10.0",
    " @/shadcn/ui": "latest",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  },
  "devDependencies": {
    " @types/node": "^20.10.0",
    " @types/react": "^18.2.0",
    " @types/three": "^0.160.0",
    "hardhat": "^2.19.0",
    "jest": "^29.7.0",
    " @testing-library/react": "^14.1.0",
    "playwright": "^1.40.0",
    "eslint": "^8.55.0"
  }
}
```

---

*Document Version: 1.0*  
*Last Updated: March 19, 2026*  
*Status: Ready for Implementation*

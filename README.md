# Wemo Web3 Dashboard

A comprehensive Web3 Dashboard and Interactive Portal built with Next.js 14, featuring wallet integration, smart contract interactions, NFT gallery, and live blockchain data.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Wagmi](https://img.shields.io/badge/Wagmi-1.4-F0F9FF?logo=ethereum)

## 🚀 Features

- **🔐 Wallet Integration** — Connect MetaMask, WalletConnect, Coinbase Wallet
- **📊 Dashboard Widgets** — Real-time stats, earnings charts, node status
- **🖼️ NFT Gallery** — View and manage your NFT collection
- **📈 Live Data** — Gas prices, token prices, transaction history
- **🎨 Beautiful UI** — Fynex-style design with smooth animations
- **🌙 Dark Mode** — Full light/dark theme support
- **📱 Responsive** — Works on desktop, tablet, and mobile

## 🎨 Design Aesthetic

Based on the Fynex dashboard style:
- **Color Palette**: Soft lavender/purple gradients (#E8E4F5, #C4B5FD, #8B5CF6)
- **Cards**: White/light backgrounds with subtle shadows and rounded corners
- **Floating Elements**: Crypto icons with gentle floating animations
- **Typography**: Clean sans-serif with bold headings
- **Animations**: Smooth transitions using Framer Motion

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Web3**: Wagmi, RainbowKit, Viem, Ethers.js
- **Animations**: Framer Motion, Three.js, React Three Fiber
- **Charts**: Recharts
- **Testing**: Jest, React Testing Library, Playwright
- **Mock Data**: Custom mock database for development

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Seed mock data (for development)
npm run db:seed

# Start development server
npm run dev
```

## 🚀 Getting Started

1. **Development Mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

2. **Mock Database**
   
   By default, the app runs with `MOCK_DB=true` for development:
   - Mock user: "Adam McCall"
   - Wallet: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
   - Pre-seeded NFTs, transactions, and portfolio stats

3. **Connect Wallet**
   
   Click "Connect Wallet" and select a provider. In mock mode, this simulates a connection without requiring an actual wallet.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── 3d/               # Three.js components
│   ├── animations/       # Framer Motion components
│   ├── dashboard/        # Dashboard widgets
│   ├── ui/               # Base UI components
│   └── ...
├── lib/                   # Utilities and hooks
│   ├── hooks/            # Custom React hooks
│   ├── mock-db.ts        # Mock database
│   ├── utils.ts          # Helper functions
│   └── wagmi-config.ts   # Web3 configuration
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── __tests__/            # Test files
    ├── components/       # Component tests
    ├── lib/              # Utility tests
    └── ...

e2e/                       # Playwright E2E tests
└── dashboard.spec.ts
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📊 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/wallet/connect` | Initialize wallet connection |
| `GET` | `/api/wallet/balance` | Fetch wallet balance |
| `GET` | `/api/wallet/nfts` | Fetch NFTs |
| `GET` | `/api/wallet/transactions` | Fetch transaction history |
| `POST` | `/api/contract/read` | Read contract data |
| `POST` | `/api/contract/write` | Write to contract |
| `GET` | `/api/blockchain/gas` | Fetch gas prices |
| `GET` | `/api/blockchain/prices` | Fetch token prices |
| `POST` | `/api/auth/siwe` | Sign-In with Ethereum |
| `GET` | `/api/portfolio/stats` | Fetch portfolio stats |

## 🎯 Component Library

### Layout Components
- `RootLayout` — App wrapper with providers
- `Navbar` — Top navigation bar
- `Sidebar` — Collapsible sidebar
- `DashboardLayout` — Main dashboard wrapper

### Dashboard Widgets
- `StatCard` — Gradient stat cards
- `EarningStatistics` — Line chart with earnings
- `NodeStatus` — Node health table
- `AchievementTiers` — Tier progress tracker
- `ReferralWidget` — Referral code display

### Web3 Components
- `WalletConnect` — Wallet connection modal
- `WalletButton` — Connect/disconnect button
- `NFTGallery` — NFT grid display
- `TransactionList` — Transaction history

### 3D & Animation
- `Hero3D` — Three.js hero component
- `FloatingIcons` — Animated crypto icons
- `AnimatedBackground` — Gradient mesh background
- `PageTransition` — Framer Motion transitions

## ⚙️ Configuration

### Environment Variables

```env
# App
NEXT_PUBLIC_APP_NAME="Wemo Web3 Dashboard"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Blockchain
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CHAIN_NAME="Sepolia"
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.etherscan.io

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# Mock DB
MOCK_DB=true
NEXT_PUBLIC_MOCK_USER_NAME="Adam McCall"
NEXT_PUBLIC_MOCK_USER_WALLET="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

### Tailwind Theme

Custom colors configured in `tailwind.config.js`:
- `web3-lavender`: #E8E4F5
- `web3-purple`: #C4B5FD
- `web3-violet`: #8B5CF6
- `web3-indigo`: #6366F1

## 📝 Development Guidelines

### DO
- ✅ Use mock data for development
- ✅ Test with `MOCK_DB=true`
- ✅ Follow TypeScript strict mode
- ✅ Write tests for new features
- ✅ Use Framer Motion for animations
- ✅ Maintain responsive design

### DO NOT
- ❌ Modify production configs
- ❌ Skip animation implementations
- ❌ Ignore mobile responsiveness
- ❌ Deploy without testing
- ❌ Break existing functionality

## 🚧 Implementation Phases

- [x] **Phase 1**: Project scaffolding (Week 1)
- [x] **Phase 2**: Core features (Week 2)
- [ ] **Phase 3**: Web3 integration (Week 3)
- [ ] **Phase 4**: NFT gallery (Week 4)
- [ ] **Phase 5**: 3D & animations (Week 5)
- [ ] **Phase 6**: Polish & testing (Week 6)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Design inspired by Fynex dashboard
- Built with Next.js and the amazing React ecosystem
- Icons from Heroicons and Lucide

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: March 19, 2026  
**Status**: Phase 1 & 2 Complete ✅

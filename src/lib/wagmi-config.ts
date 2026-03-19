// src/lib/wagmi-config.ts
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  sepolia,
} from 'wagmi/chains';

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 11155111;
const defaultChain = sepolia;

// Configure chains and providers
const { chains: configuredChains, publicClient } = configureChains(
  [defaultChain],
  [publicProvider()]
);

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export { defaultChain, configuredChains as chains };

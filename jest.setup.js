// jest.setup.js
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock environment variables
process.env.MOCK_DB = 'true';
process.env.NEXT_PUBLIC_MOCK_USER_NAME = 'Adam McCall';
process.env.NEXT_PUBLIC_MOCK_USER_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
process.env.NEXT_PUBLIC_CHAIN_ID = '11155111';
process.env.NEXT_PUBLIC_CHAIN_NAME = 'Sepolia';

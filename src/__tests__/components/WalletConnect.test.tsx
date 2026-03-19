// src/__tests__/components/WalletConnect.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnect } from '@/components/WalletConnect';
import '@testing-library/jest-dom';

describe('WalletConnect', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConnect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders wallet providers', () => {
    render(<WalletConnect {...mockProps} />);

    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('WalletConnect')).toBeInTheDocument();
    expect(screen.getByText('Coinbase Wallet')).toBeInTheDocument();
  });

  it('displays title and description', () => {
    render(<WalletConnect {...mockProps} />);

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    expect(screen.getByText('Choose your preferred wallet to connect')).toBeInTheDocument();
  });

  it('calls onClose when closed', () => {
    render(<WalletConnect {...mockProps} />);

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onConnect when a wallet is selected', async () => {
    render(<WalletConnect {...mockProps} />);

    const metamaskButton = screen.getByText('MetaMask').closest('button');
    if (metamaskButton) {
      fireEvent.click(metamaskButton);
    }

    // Wait for the simulated connection delay
    await new Promise(resolve => setTimeout(resolve, 1600));

    expect(mockProps.onConnect).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    render(<WalletConnect {...mockProps} isOpen={false} />);

    expect(screen.queryByText('Connect Wallet')).not.toBeInTheDocument();
  });
});

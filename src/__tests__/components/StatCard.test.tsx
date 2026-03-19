// src/__tests__/components/StatCard.test.tsx
import { render, screen, waitFor, act } from '@testing-library/react';
import { StatCard } from '@/components/dashboard/StatCard';
import '@testing-library/jest-dom';

describe('StatCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders title and value correctly', async () => {
    render(
      <StatCard
        title="Epoch Earning"
        value={2250.75}
        suffix="WEMO"
        gradient="purple"
      />
    );

    expect(screen.getByText('Epoch Earning')).toBeInTheDocument();
    expect(screen.getByText('WEMO')).toBeInTheDocument();
    
    // Advance timers to complete animation
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Value is formatted as 2.25K for thousands
    expect(screen.getByText('2.25K')).toBeInTheDocument();
  });

  it('displays trend indicator when provided', () => {
    render(
      <StatCard
        title="Total Earnings"
        value={250843.20}
        gradient="blue"
        trend={12.5}
      />
    );

    // Trend percentage is displayed (text may be split across elements)
    expect(screen.getByText(/12\.5/)).toBeInTheDocument();
    expect(screen.getByText('vs last epoch')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <StatCard
        title="Test Card"
        value={100}
        gradient="green"
        icon={<svg data-testid="icon" />}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies correct gradient classes', () => {
    const { container } = render(
      <StatCard
        title="Test Card"
        value={100}
        gradient="purple"
        icon={<svg />}
      />
    );

    const iconContainer = container.querySelector('.from-web3-violet');
    expect(iconContainer).toBeInTheDocument();
  });
});

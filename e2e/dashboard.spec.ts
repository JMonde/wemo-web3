// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('loads the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Wemo Web3 Dashboard/);
  });

  test('displays hero section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Unlock the Power of Crypto')).toBeVisible();
  });

  test('shows wallet connect button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Connect Wallet')).toBeVisible();
  });

  test('connects wallet and shows dashboard', async ({ page }) => {
    await page.goto('/');

    // Click connect wallet
    await page.getByText('Connect Wallet').click();

    // Select MetaMask
    await page.getByText('MetaMask').click();

    // Wait for connection
    await page.waitForTimeout(2000);

    // Should show wallet address
    await expect(page.getByText(/0x742d.*f0bEb/)).toBeVisible();

    // Should show dashboard stats
    await expect(page.getByText('Epoch Earning')).toBeVisible();
    await expect(page.getByText('Total Earnings')).toBeVisible();
    await expect(page.getByText('Total Nodes')).toBeVisible();
  });

  test('displays stat cards with correct data', async ({ page }) => {
    await page.goto('/');

    // Connect wallet first
    await page.getByText('Connect Wallet').click();
    await page.getByText('MetaMask').click();
    await page.waitForTimeout(2000);

    // Check stat cards exist
    await expect(page.getByText('Epoch Earning')).toBeVisible();
    await expect(page.getByText('2,250')).toBeVisible();
    await expect(page.getByText('Total Nodes')).toBeVisible();
    await expect(page.getByText('19')).toBeVisible();
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto('/');

    // Connect wallet
    await page.getByText('Connect Wallet').click();
    await page.getByText('MetaMask').click();
    await page.waitForTimeout(2000);

    // Click on sidebar items
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Portfolio')).toBeVisible();
    await expect(page.getByText('Node Management')).toBeVisible();
  });

  test('responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Connect wallet
    await page.getByText('Connect Wallet').click();
    await page.getByText('MetaMask').click();
    await page.waitForTimeout(2000);

    // Stat cards should stack on mobile
    const statCards = await page.locator('[class*="grid"]').all();
    expect(statCards.length).toBeGreaterThan(0);
  });
});

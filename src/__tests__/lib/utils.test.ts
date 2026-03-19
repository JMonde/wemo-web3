// src/__tests__/lib/utils.test.ts
import { formatAddress, formatNumber, formatCurrency, formatDate, formatTimeAgo, truncateString } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatAddress', () => {
    it('formats address with default chars', () => {
      const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
      expect(formatAddress(address)).toBe('0x742d...0bEb');
    });

    it('formats address with custom chars', () => {
      const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
      expect(formatAddress(address, 6)).toBe('0x742d35...5f0bEb');
    });

    it('returns empty string for empty address', () => {
      expect(formatAddress('')).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('formats small numbers', () => {
      expect(formatNumber(123.456)).toBe('123.46');
    });

    it('formats thousands', () => {
      expect(formatNumber(1234.567)).toBe('1.23K');
    });

    it('formats millions', () => {
      expect(formatNumber(1234567.89)).toBe('1.23M');
    });

    it('respects decimal places', () => {
      expect(formatNumber(1234.567, 1)).toBe('1.2K');
    });
  });

  describe('formatCurrency', () => {
    it('formats as USD by default', () => {
      expect(formatCurrency(1234.56)).toContain('$');
    });

    it('formats with correct currency', () => {
      expect(formatCurrency(1234.56, 'EUR')).toContain('€');
    });
  });

  describe('formatDate', () => {
    it('formats date string', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toBeDefined();
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('formats Date object', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toBeDefined();
    });
  });

  describe('formatTimeAgo', () => {
    it('returns "just now" for recent dates', () => {
      const now = new Date();
      expect(formatTimeAgo(now)).toBe('just now');
    });

    it('returns minutes ago', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatTimeAgo(fiveMinutesAgo)).toContain('m ago');
    });

    it('returns hours ago', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(formatTimeAgo(threeHoursAgo)).toContain('h ago');
    });
  });

  describe('truncateString', () => {
    it('truncates long strings', () => {
      const str = 'This is a very long string that should be truncated';
      expect(truncateString(str, 20)).toBe('This is a very long ...');
    });

    it('does not truncate short strings', () => {
      const str = 'Short string';
      expect(truncateString(str, 20)).toBe('Short string');
    });

    it('handles exact length strings', () => {
      const str = 'Exactly 10';
      expect(truncateString(str, 10)).toBe('Exactly 10');
    });
  });
});

import { describe, it, expect } from 'vitest';

// Helper function to format time remaining
function formatTimeRemaining(endTime: number): string {
  const now = Date.now() / 1000;
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    return 'Ended';
  }

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Helper function to format ETH amount
function formatEth(wei: string | bigint): string {
  const value = typeof wei === 'string' ? BigInt(wei) : wei;
  const eth = Number(value) / 1e18;
  return eth.toFixed(4);
}

describe('Format Utils', () => {
  describe('formatTimeRemaining', () => {
    it('formats time with hours and minutes', () => {
      const futureTime = Date.now() / 1000 + 7200; // 2 hours from now
      const result = formatTimeRemaining(futureTime);
      expect(result).toMatch(/\d+h \d+m/);
    });

    it('formats time with only minutes when less than 1 hour', () => {
      const futureTime = Date.now() / 1000 + 1800; // 30 minutes from now
      const result = formatTimeRemaining(futureTime);
      expect(result).toMatch(/\d+m/);
      expect(result).not.toContain('h');
    });

    it('returns "Ended" when time is up', () => {
      const pastTime = Date.now() / 1000 - 3600; // 1 hour ago
      expect(formatTimeRemaining(pastTime)).toBe('Ended');
    });

    it('returns "Ended" for current time', () => {
      const currentTime = Date.now() / 1000;
      expect(formatTimeRemaining(currentTime)).toBe('Ended');
    });
  });

  describe('formatEth', () => {
    it('formats wei to ETH correctly', () => {
      expect(formatEth('1000000000000000000')).toBe('1.0000');
      expect(formatEth('500000000000000000')).toBe('0.5000');
      expect(formatEth('100000000000000000')).toBe('0.1000');
    });

    it('handles BigInt input', () => {
      expect(formatEth(BigInt('1000000000000000000'))).toBe('1.0000');
    });

    it('formats small amounts correctly', () => {
      expect(formatEth('10000000000000000')).toBe('0.0100');
    });

    it('handles zero', () => {
      expect(formatEth('0')).toBe('0.0000');
    });
  });
});

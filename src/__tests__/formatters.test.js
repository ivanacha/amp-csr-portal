/**
 * Example unit tests for src/utils/formatters.js
 *
 * Run with: npx vitest  (install vitest: npm install -D vitest)
 */

import { formatPhone, formatPlate, formatRenewDate } from '../utils/formatters';

// ── formatPhone ────────────────────────────────────────────────────────────
describe('formatPhone', () => {
  it('formats a 10-digit string to (NXX) NXX-XXXX', () => {
    expect(formatPhone('4045551234')).toBe('(404) 555-1234');
  });

  it('strips non-digit characters before formatting', () => {
    expect(formatPhone('(404) 555-1234')).toBe('(404) 555-1234');
  });

  it('handles partial input gracefully', () => {
    expect(formatPhone('404')).toBe('404');
    expect(formatPhone('4045')).toBe('(404) 5');
  });

  it('truncates input beyond 10 digits', () => {
    expect(formatPhone('40455512349999')).toBe('(404) 555-1234');
  });
});

// ── formatPlate ────────────────────────────────────────────────────────────
describe('formatPlate', () => {
  it('formats letters and digits as XXX-NNNN', () => {
    expect(formatPlate('abc1234')).toBe('ABC-1234');
  });

  it('normalises already-formatted plates', () => {
    expect(formatPlate('ABC-1234')).toBe('ABC-1234');
  });

  it('limits letters to 3 and digits to 4', () => {
    expect(formatPlate('ABCDEF12345')).toBe('ABC-1234');
  });

  it('returns raw input when no valid characters present', () => {
    expect(formatPlate('')).toBe('-');
  });
});

// ── formatRenewDate ────────────────────────────────────────────────────────
describe('formatRenewDate', () => {
  it('formats a Date object as "Mon D, YYYY"', () => {
    expect(formatRenewDate(new Date(2026, 3, 15))).toBe('Apr 15, 2026');
  });

  it('returns null for a falsy value', () => {
    expect(formatRenewDate(null)).toBeNull();
    expect(formatRenewDate(undefined)).toBeNull();
  });
});

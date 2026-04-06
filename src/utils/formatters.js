/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Utility functions for formatting phone numbers, license plates, and renewal dates for display.
 */

/** Formats a raw digit string into (XXX) XXX-XXXX phone format, up to 10 digits. */
export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Normalizes a license plate string into LLL-DDDD format (up to 3 letters + 4 digits). */
export function formatPlate(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const letters = clean.replace(/[^A-Z]/g, '').slice(0, 3);
  const digits = clean.replace(/[^0-9]/g, '').slice(0, 4);
  if (!letters && !digits) return raw;
  return `${letters}-${digits}`;
}

/** Formats a Date object into a short locale string like "Jan 1, 2026". */
export function formatRenewDate(date) {
  if (!date) return null;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

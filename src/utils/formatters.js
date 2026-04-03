export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatPlate(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const letters = clean.replace(/[^A-Z]/g, '').slice(0, 3);
  const digits = clean.replace(/[^0-9]/g, '').slice(0, 4);
  if (!letters && !digits) return raw;
  return `${letters}-${digits}`;
}

export function formatRenewDate(date) {
  if (!date) return null;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Modal form for updating a customer's payment card details (number, name, expiry, CSC, ZIP).
 */

import { useState } from 'react';
import { Btn } from '../Btn';

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  marginBottom: 5,
  display: 'block',
};

/** Returns the input border style, switching to red when the field has a validation error. */
function inputStyle(error) {
  return {
    background: 'var(--surface-2)',
    border: `1.5px solid ${error ? 'var(--red)' : 'var(--amp-sky)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '7px 10px',
    fontSize: 13.5,
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
  };
}

export default function CardModal({ card, onSave, onClose }) {
  const [form, setForm] = useState({
    number: card?.number ?? '',
    name:   card?.name   ?? '',
    expiry: card?.expiry ?? '',
    csc:    card?.csc    ?? '',
    zip:    card?.zip    ?? '',
  });
  const [errors, setErrors] = useState({});

  /** Clears the error for a field as soon as the user starts typing in it. */
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  /** Validates all required fields; highlights missing ones in red and blocks save if any are empty. */
  function handleSave() {
    const required = ['number', 'name', 'expiry', 'csc', 'zip'];
    const newErrors = {};
    required.forEach((key) => { if (!form[key].trim()) newErrors[key] = true; });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)' }}>
          Update Payment Method
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ ...labelStyle, color: errors.number ? 'var(--red)' : 'var(--text-3)' }}>Card Number</label>
          <input style={inputStyle(errors.number)} value={form.number} onChange={set('number')} placeholder="1234 5678 9012 3456" maxLength={16} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ ...labelStyle, color: errors.name ? 'var(--red)' : 'var(--text-3)' }}>Name on Card</label>
          <input style={inputStyle(errors.name)} value={form.name} onChange={set('name')} placeholder="Full name as on card" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.expiry ? 'var(--red)' : 'var(--text-3)' }}>Expiration</label>
            <input style={inputStyle(errors.expiry)} value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" maxLength={5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.csc ? 'var(--red)' : 'var(--text-3)' }}>Security Code</label>
            <input style={inputStyle(errors.csc)} value={form.csc} onChange={set('csc')} placeholder="CSC" maxLength={4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.zip ? 'var(--red)' : 'var(--text-3)' }}>ZIP Code</label>
            <input style={inputStyle(errors.zip)} value={form.zip} onChange={set('zip')} placeholder="ZIP" maxLength={10} />
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div style={{ fontSize: 12.5, color: 'var(--red)', marginTop: -4 }}>
            Please fill in all required fields before saving.
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave}>Save Card</Btn>
        </div>
      </div>
    </div>
  );
}

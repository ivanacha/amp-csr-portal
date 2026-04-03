import React, { useState } from 'react';
import { Btn } from '../Btn';

const inputStyle = {
  background: 'var(--surface-2)',
  border: '1.5px solid var(--amp-sky)',
  borderRadius: 'var(--radius-sm)',
  padding: '7px 10px',
  fontSize: 13.5,
  color: 'var(--text)',
  outline: 'none',
  width: '100%',
};

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  color: 'var(--text-3)',
  marginBottom: 5,
  display: 'block',
};

export default function CardModal({ card, onSave, onClose }) {
  const [form, setForm] = useState({
    number: card?.number ?? '',
    name:   card?.name   ?? '',
    expiry: card?.expiry ?? '',
    csc:    card?.csc    ?? '',
    zip:    card?.zip    ?? '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)' }}>
          Update Payment Method
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle}>Card Number</label>
          <input style={inputStyle} value={form.number} onChange={set('number')} placeholder="1234 5678 9012 3456" maxLength={16} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle}>Name on Card</label>
          <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Full name as on card" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Expiration</label>
            <input style={inputStyle} value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" maxLength={5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Security Code</label>
            <input style={inputStyle} value={form.csc} onChange={set('csc')} placeholder="CSC" maxLength={4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>ZIP Code</label>
            <input style={inputStyle} value={form.zip} onChange={set('zip')} placeholder="ZIP" maxLength={10} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(form)}>Save Card</Btn>
        </div>
      </div>
    </div>
  );
}

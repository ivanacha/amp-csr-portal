import React from 'react';

export default function Card({ title, icon, actions, children }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface-2)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 13.5,
          color: 'var(--amp-navy)',
        }}>
          {icon}
          {title}
        </div>
        {actions}
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

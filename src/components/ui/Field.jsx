/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Reusable labeled field component that toggles between a read-only display and an editable input.
 */

import React from 'react';

export default function Field({ label, value, editing, inputProps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: 'var(--text-3)',
      }}>
        {label}
      </div>
      {editing ? (
        <input
          style={{
            background: 'var(--surface-2)',
            border: '1.5px solid var(--amp-sky)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 10px',
            fontSize: 13.5,
            color: 'var(--text)',
            outline: 'none',
            width: '100%',
          }}
          {...inputProps}
        />
      ) : (
        <div style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 400 }}>{value}</div>
      )}
    </div>
  );
}

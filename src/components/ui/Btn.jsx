/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Reusable button primitives (Btn and IconBtn) with variant-based styling used throughout the app's UI.
 */

import React from 'react';

// Maps variant names to their inline style tokens
const VARIANTS = {
  primary:   { background: 'var(--amp-cobalt)', color: '#fff',           borderColor: 'var(--amp-cobalt)' },
  secondary: { background: '#fff',              color: 'var(--amp-cobalt)', borderColor: 'var(--border)' },
  ghost:     { background: 'transparent',       color: 'var(--text-2)',  borderColor: 'var(--border)' },
  danger:    { background: '#fff',              color: 'var(--red)',     borderColor: 'var(--red-border)' },
};

export function Btn({ onClick, variant = 'secondary', children, style: extra }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 14px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 12.5,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
        border: '1px solid transparent',
        ...VARIANTS[variant],
        ...extra,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function IconBtn({ onClick, title, danger, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 30,
        height: 30,
        borderRadius: 7,
        border: `1px solid ${danger ? 'var(--red-border)' : 'var(--border)'}`,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: danger ? 'var(--red)' : 'var(--text-2)',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

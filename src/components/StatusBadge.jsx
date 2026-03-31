import React from 'react';

const STATUS_CONFIG = {
  active: {
    label: 'Active',
    color: 'var(--green)',
    bg: 'var(--green-bg)',
    border: 'var(--green-border)',
  },
  paused: {
    label: 'Paused',
    color: 'var(--yellow)',
    bg: 'var(--yellow-bg)',
    border: 'var(--yellow-border)',
  },
  overdue: {
    label: 'Overdue',
    color: 'var(--red)',
    bg: 'var(--red-bg)',
    border: 'var(--red-border)',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'var(--grey)',
    bg: 'var(--grey-bg)',
    border: 'var(--grey-border)',
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.cancelled;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 9px',
        borderRadius: '20px',
        border: `1px solid ${config.border}`,
        background: config.bg,
        color: config.color,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: config.color,
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}

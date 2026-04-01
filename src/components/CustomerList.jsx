import React, { useState, useMemo } from 'react';
import StatusBadge from './StatusBadge';
import { AVATAR_COLORS } from '../data/mockData';

const STATUS_FILTERS = [
  { value: 'all', label: 'All Customers' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'cancelled', label: 'Cancelled' },
];

function initials(c) {
  return (c.firstName[0] + c.lastName[0]).toUpperCase();
}

const s = {
  page: { padding: '28px 32px', maxWidth: 1200, margin: '0 auto' },
  toolbar: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 14px',
    width: 280,
    boxShadow: 'var(--shadow-sm)',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 13.5,
    color: 'var(--text)',
    width: '100%',
    background: 'transparent',
  },
  searchIcon: { color: 'var(--text-3)', flexShrink: 0 },
  filterGroup: { display: 'flex', gap: 6, marginLeft: 'auto' },
  filterPill: (active) => ({
    padding: '6px 14px',
    borderRadius: 20,
    border: `1px solid ${active ? 'var(--amp-cobalt)' : 'var(--border)'}`,
    background: active ? 'var(--amp-cobalt)' : '#fff',
    color: active ? '#fff' : 'var(--text-2)',
    fontSize: 12.5,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  }),
  count: { fontSize: 13, color: 'var(--text-3)', marginTop: -4, marginBottom: 12 },
  tableWrap: {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '11px 16px',
    textAlign: 'left',
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.9px',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    fontWeight: 500,
    background: 'var(--surface-2)',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap',
  },
  tr: (hover) => ({
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    background: hover ? 'var(--amp-light-blue)' : 'transparent',
    transition: 'background 0.1s',
  }),
  td: { padding: '13px 16px', verticalAlign: 'middle' },
  userCell: { display: 'flex', alignItems: 'center', gap: 11 },
  avatar: (color) => ({
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  }),
  userName: { fontSize: 13.5, fontWeight: 600, color: 'var(--text)' },
  userEmail: { fontSize: 12, color: 'var(--text-3)', marginTop: 1 },
  mono: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: 'var(--text-2)',
  },
  viewBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 13px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: '#fff',
    color: 'var(--amp-cobalt)',
    fontSize: 12.5,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  emptyState: {
    padding: '60px 20px',
    textAlign: 'center',
    color: 'var(--text-3)',
    fontSize: 13.5,
  },
};

export default function CustomerList({ customers, onSelectCustomer }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return customers
      .filter((c) => {
        const matchesQuery = [c.firstName, c.lastName, c.email, c.phone, c.id]
          .join(' ')
          .toLowerCase()
          .includes(q);
        const matchesStatus = activeFilter === 'all' || c.status === activeFilter;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [query, activeFilter, customers]);

  return (
    <div style={s.page}>
      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <svg style={s.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            style={s.searchInput}
            placeholder="Search name, email, phone, ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div style={s.filterGroup}>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              style={s.filterPill(activeFilter === f.value)}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.count}>
        {filtered.length} {filtered.length === 1 ? 'customer' : 'customers'}
      </div>

      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Customer</th>
              <th style={s.th}>Account ID</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Plan</th>
              <th style={s.th}>Vehicles</th>
              <th style={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={s.emptyState}>
                  No customers found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  style={{
                    ...s.tr(hoveredRow === c.id),
                    borderBottom: '1px solid var(--border)',
                  }}
                  onClick={() => onSelectCustomer(c.id)}
                  onMouseEnter={() => setHoveredRow(c.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={s.td}>
                    <div style={s.userCell}>
                      <div style={s.avatar(AVATAR_COLORS[c.color])}>{initials(c)}</div>
                      <div>
                        <div style={s.userName}>{c.firstName} {c.lastName}</div>
                        <div style={s.userEmail}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={s.td}>
                    <span style={s.mono}>{c.id}</span>
                  </td>
                  <td style={s.td}>
                    <StatusBadge status={c.status} />
                  </td>
                  <td style={s.td}>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.plan}</span>
                  </td>
                  <td style={s.td}>
                    <span style={{ ...s.mono, fontSize: 13 }}>{c.vehicles}</span>
                  </td>
                  <td style={{ ...s.td, textAlign: 'right' }}>
                    <button
                      style={s.viewBtn}
                      onClick={(e) => { e.stopPropagation(); onSelectCustomer(c.id); }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--amp-cobalt)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = 'var(--amp-cobalt)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = 'var(--amp-cobalt)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

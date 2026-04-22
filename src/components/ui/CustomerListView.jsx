/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Pure presentational component that renders the full customer list UI — search bar, filter pills, sortable table, and pagination.
 */

import React from 'react';
import StatusBadge from '../StatusBadge';
import { AVATAR_COLORS } from '../../data/mockData';
import { STATUS_FILTERS, LIST_COLUMNS } from '../../constants';

function initials(c) {
  return (c.firstName[0] + c.lastName[0]).toUpperCase();
}

// Styles object for inline styling of the customer list view components. This keeps all styles in one place and allows for dynamic styling based on inherited props.
const s = {
  page: { padding: '28px 32px', maxWidth: 1200, margin: '0 auto' },
  toolbar: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 },
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: 9,
    background: '#fff', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', padding: '8px 14px',
    width: 280, boxShadow: 'var(--shadow-sm)',
  },
  searchInput: { border: 'none', outline: 'none', fontSize: 13.5, color: 'var(--text)', width: '100%', background: 'transparent' },
  searchIcon: { color: 'var(--text-3)', flexShrink: 0 },
  filterGroup: { display: 'flex', gap: 6, marginLeft: 'auto' },
  filterPill: (active) => ({
    padding: '6px 14px', borderRadius: 20,
    border: `1px solid ${active ? 'var(--brand-cobalt)' : 'var(--border)'}`,
    background: active ? 'var(--brand-cobalt)' : '#fff',
    color: active ? '#fff' : 'var(--text-2)',
    fontSize: 12.5, fontWeight: active ? 600 : 400,
    cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
  }),
  count: { fontSize: 13, color: 'var(--text)', marginTop: -4, marginBottom: 12 },
  tableWrap: { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' },
  table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' },
  colWidths: ['25%', '17%', '15%', '14%', '9%', '14%'],
  th: {
    padding: '11px 16px', textAlign: 'left',
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: '0.9px', textTransform: 'uppercase',
    color: 'var(--text)', fontWeight: 500,
    background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
  },
  tr: (hover) => ({ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: hover ? 'var(--brand-light-blue)' : 'transparent', transition: 'background 0.1s' }),
  td: { padding: '13px 16px', verticalAlign: 'middle' },
  userCell: { display: 'flex', alignItems: 'center', gap: 11 },
  avatar: (color) => ({ width: 34, height: 34, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }),
  userName: { fontSize: 13.5, fontWeight: 600, color: 'var(--text)' },
  userEmail: { fontSize: 12, color: 'var(--text-3)', marginTop: 1 },
  mono: { fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-2)' },
  viewBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: '#fff', color: 'var(--brand-cobalt)', fontSize: 12.5, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' },
  emptyState: { padding: '60px 20px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13.5 },
};

// Presentational component for rendering the customer list UI with search, filters, sorting, and pagination. All data and handlers are received via props from the parent container component.
export default function CustomerListView({
  paginated,
  filteredCount,
  query,
  onQueryChange,
  activeFilter,
  onFilterChange,
  sortKey,
  sortDir,
  onSort,
  hoveredRow,
  onHoverRow,
  onUnhoverRow,
  currentPage,
  totalPages,
  pages,
  onPageChange,
  onSelectCustomer,
}) {
  return (
    <div style={s.page}>
      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <svg style={s.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            style={s.searchInput}
            placeholder="Search name, email or account ID"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <div style={s.filterGroup}>
          {STATUS_FILTERS.map((f) => (
            <button key={f.value} style={s.filterPill(activeFilter === f.value)} onClick={() => onFilterChange(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.count}>{filteredCount} {filteredCount === 1 ? 'customer' : 'customers'}</div>

      <div style={s.tableWrap}>
        <table style={s.table}>
          <colgroup>
            {s.colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
          </colgroup>
          <thead>
            <tr>
              {LIST_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  style={{ ...s.th, cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => onSort(col.key)}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    <span style={{ display: 'inline-block', width: 8, textAlign: 'center', opacity: sortKey === col.key ? 1 : 0.25, fontSize: 9, flexShrink: 0 }}>
                      {sortKey === col.key && sortDir === 'desc' ? '▼' : '▲'}
                    </span>
                  </span>
                </th>
              ))}
              <th style={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} style={s.emptyState}>No customers found matching your search.</td>
              </tr>
            ) : (
              paginated.map((c) => (
                <tr
                  key={c.id}
                  style={{ ...s.tr(hoveredRow === c.id), borderBottom: '1px solid var(--border)' }}
                  onClick={() => onSelectCustomer(c.id)}
                  onMouseEnter={() => onHoverRow(c.id)}
                  onMouseLeave={onUnhoverRow}
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
                  <td style={s.td}><span style={s.mono}>{c.id}</span></td>
                  <td style={s.td}><StatusBadge status={c.status} /></td>
                  <td style={s.td}><span style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.plan}</span></td>
                  <td style={s.td}><span style={{ ...s.mono, fontSize: 13 }}>{c.vehicles}</span></td>
                  <td style={{ ...s.td, textAlign: 'right' }}>
                    <button
                      style={s.viewBtn}
                      onClick={(e) => { e.stopPropagation(); onSelectCustomer(c.id); }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--brand-cobalt)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--brand-cobalt)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--brand-cobalt)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
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

      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 14 }}>
          <button
            style={{ ...s.viewBtn, opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {pages.map((p, i) =>
            p === '...'
              ? <span key={`e-${i}`} style={{ fontSize: 13, color: 'var(--text-3)', padding: '0 4px' }}>…</span>
              : <button
                  key={p}
                  style={{
                    ...s.viewBtn,
                    minWidth: 32,
                    justifyContent: 'center',
                    background: p === currentPage ? 'var(--brand-cobalt)' : '#fff',
                    color: p === currentPage ? '#fff' : 'var(--brand-cobalt)',
                    borderColor: p === currentPage ? 'var(--brand-cobalt)' : 'var(--border)',
                    fontWeight: p === currentPage ? 600 : 500,
                  }}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
          )}

          <button
            style={{ ...s.viewBtn, opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

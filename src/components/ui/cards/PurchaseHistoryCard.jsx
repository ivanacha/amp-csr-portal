/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Card component that renders the last 90 days of transactions with type-based icons and a running net total.
 */

import React from 'react';
import Card from '../Card';

const TX_ICONS = {
  subscription: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  wash:         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>,
  refund:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>,
  coupon:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
};

const TX_STYLE = {
  subscription: { bg: 'var(--amp-light-blue)', color: 'var(--amp-cobalt)' },
  wash:         { bg: 'var(--green-bg)',        color: 'var(--green)' },
  refund:       { bg: 'var(--red-bg)',          color: 'var(--red)' },
  coupon:       { bg: 'var(--yellow-bg)',       color: 'var(--yellow)' },
};

export default function PurchaseHistoryCard({ transactions }) {
  /** Sums accepted transactions, subtracting credits, and floors at zero for display. */
  const totalSpent = transactions
    .filter((t) => t.accepted === true)
    .reduce((sum, t) => {
      const n = parseFloat(t.amount.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(n) ? 0 : t.isCredit ? -n : n);
    }, 0);
  const displayTotal = Math.max(0, totalSpent);

  return (
    <Card
      title="Purchase History (Last 90 days)"
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
      actions={
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
          Total | ${displayTotal.toFixed(2)}
        </span>
      }
    >
      {transactions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '28px 0', color: 'var(--text-3)', fontSize: 13.5 }}>No transactions found</div>
      ) : (
        <div>
          {transactions.map((t, i) => {
            const ts = TX_STYLE[t.type] || TX_STYLE.subscription;
            return (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 13,
                padding: '11px 0',
                borderBottom: i < transactions.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: ts.bg, color: ts.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {TX_ICONS[t.type]}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: t.accepted === false ? 'var(--red)' : 'var(--text)' }}>{t.desc}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{t.meta}</div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  fontWeight: 500,
                  color: t.accepted === false ? 'var(--red)' : t.isCredit ? 'var(--green)' : 'var(--text)',
                }}>
                  {t.amount}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

import { useState } from 'react';
import { Btn } from '../Btn';
import { PLAN_PRICE, STATUS_OPTIONS } from '../../../constants';
import { formatRenewDate } from '../../../utils/formatters';

function getStatusDescription(optValue, effectiveStatus) {
  if (optValue === 'active') {
    if (effectiveStatus === 'paused') return 'Reactivates account — subscription fee charged immediately, renewal set to today';
    return 'Account is active and in good standing';
  }
  if (optValue === 'paused') {
    if (effectiveStatus === 'paused') return 'Subscription & wash access currently suspended';
    return 'Immediately suspends subscription renewals and single wash purchases';
  }
  if (optValue === 'canceled') {
    if (effectiveStatus === 'canceled') return 'Account is permanently closed';
    return 'Permanently clears all vehicle subscriptions — this action is irreversible';
  }
}

export default function ChangeStatusModal({ customer, vehicles, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onClose }) {
  const [pendingStatus, setPendingStatus] = useState(null);
  const isCanceled = customer.status === 'canceled';
  const effectiveStatus = customer.status === 'overdue' ? 'active' : customer.status;

  function handleSelect(optValue) {
    if (optValue === effectiveStatus || isCanceled) return;
    setPendingStatus(pendingStatus === optValue ? null : optValue);
  }

  function handleConfirm() {
    if (!pendingStatus) return;
    const today = new Date();

    if (pendingStatus === 'paused') {
      onUpdateCustomer({ status: 'paused', renew: null });
      onUpdateVehicles(vehicles.map((v) => ({ ...v, isPaused: true })));
    } else if (pendingStatus === 'canceled') {
      onUpdateCustomer({ status: 'canceled', plan: '—', renew: null });
      onUpdateVehicles([]);
    } else if (pendingStatus === 'active') {
      const renewDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      const price = PLAN_PRICE[customer.plan] || 0;
      const total = price * vehicles.length;
      const countLabel = vehicles.length > 1 ? ` (×${vehicles.length})` : '';
      onUpdateCustomer({ status: 'active', renew: renewDate });
      onUpdateVehicles(vehicles.map((v) => ({ ...v, isPaused: false })));
      onAddTransaction({
        id: `t_${Date.now()}`,
        type: 'subscription',
        desc: `Subscription Reactivation — ${customer.plan}${countLabel}`,
        meta: `${formatRenewDate(today)} · Reactivation charge`,
        amount: `$${total.toFixed(2)}`,
        isCredit: false,
        accepted: true,
      });
    }
    onClose();
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)', marginBottom: 6 }}>
            Change Account Status
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
            {isCanceled
              ? 'Canceled accounts cannot have their status changed.'
              : 'Select a new status, then confirm to apply immediately.'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STATUS_OPTIONS.map((opt) => {
            const isCurrent = opt.value === effectiveStatus;
            const isPending = pendingStatus === opt.value;
            const isDisabled = isCanceled && !isCurrent;
            const isSelectable = !isCurrent && !isDisabled;

            return (
              <div key={opt.value} style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
                <button
                  disabled={isDisabled}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: isCurrent
                      ? `2px solid ${opt.color}`
                      : isPending
                      ? '2px solid var(--amp-cobalt)'
                      : '1.5px solid var(--border)',
                    background: isCurrent ? opt.bg : isPending ? 'var(--amp-light-blue)' : '#fff',
                    cursor: isSelectable ? 'pointer' : 'default',
                    opacity: isDisabled ? 0.35 : 1,
                    transition: 'all 0.15s',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: isPending ? 'var(--amp-cobalt)' : opt.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, fontWeight: isCurrent || isPending ? 600 : 400, color: isCurrent ? opt.color : isPending ? 'var(--amp-cobalt)' : 'var(--text)' }}>
                        {opt.label}
                      </span>
                    </div>
                    {isCurrent && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: opt.color, letterSpacing: '0.5px' }}>
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4, marginLeft: 17 }}>
                    {getStatusDescription(opt.value, effectiveStatus)}
                  </div>
                </button>

                {/* Slide-in confirm button from the right */}
                <div style={{
                  flexShrink: 0,
                  maxWidth: isPending ? 110 : 0,
                  opacity: isPending ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-width 0.2s ease, opacity 0.15s ease',
                }}>
                  <button
                    onClick={handleConfirm}
                    style={{
                      height: '100%',
                      padding: '0 14px',
                      background: 'var(--amp-cobalt)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Confirm
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}

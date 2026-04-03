import React, { useState } from 'react';
import { Btn } from '../Btn';
import { PLANS, PLAN_PRICE } from '../../../constants';
import { formatRenewDate } from '../../../utils/formatters';

const SELECT_STYLE = {
  background: 'var(--surface-2)',
  border: '1.5px solid var(--amp-sky)',
  borderRadius: 'var(--radius-sm)',
  padding: '7px 32px 7px 10px',
  fontSize: 13.5,
  color: 'var(--text)',
  outline: 'none',
  width: '100%',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
};

export default function ChangePlanModal({ customer, vehicles, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(customer.plan);

  const currentPrice = PLAN_PRICE[customer.plan] || 0;
  const newPrice = PLAN_PRICE[selectedPlan] || 0;
  const diff = newPrice - currentPrice;
  const count = vehicles.length || 1;
  const totalDiff = diff * count;
  const countLabel = count > 1 ? ` (×${count})` : '';
  const isDowngrade = totalDiff < 0;
  const noChange = selectedPlan === customer.plan;

  function handleConfirm() {
    if (noChange) { onClose(); return; }
    const today = new Date();
    const dateLabel = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    onUpdateCustomer({ plan: selectedPlan });
    onUpdateVehicles(vehicles.map((v) => ({ ...v, plan: selectedPlan })));
    onAddTransaction({
      id: `t_${Date.now()}`,
      type: isDowngrade ? 'refund' : 'subscription',
      desc: isDowngrade
        ? `Plan Downgrade Refund — ${customer.plan} → ${selectedPlan}${countLabel}`
        : `Plan Upgrade Charge — ${customer.plan} → ${selectedPlan}${countLabel}`,
      meta: `${dateLabel} · Plan change`,
      amount: isDowngrade ? `+$${Math.abs(totalDiff).toFixed(2)}` : `$${totalDiff.toFixed(2)}`,
      isCredit: isDowngrade,
      accepted: true,
    });
    onClose();
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 400, display: 'flex', flexDirection: 'column', gap: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)', marginBottom: 6 }}>
            Change Plan
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
            Select a new subscription plan. Any price difference will be charged or refunded immediately.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            New Plan
          </div>
          <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} style={SELECT_STYLE}>
            {PLANS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        {!noChange && (
          <div style={{
            background: isDowngrade ? 'var(--green-bg)' : 'var(--amp-light-blue)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {customer.plan} → {selectedPlan}{countLabel}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>
                {isDowngrade ? 'Refund to card on file' : 'Charge to card on file'}
              </div>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 600, color: isDowngrade ? 'var(--green)' : 'var(--amp-navy)' }}>
              {isDowngrade ? '+' : ''}${Math.abs(totalDiff).toFixed(2)}
            </div>
          </div>
        )}

        {!noChange && (
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
            {isDowngrade
              ? `A refund of $${Math.abs(totalDiff).toFixed(2)} will be issued to the card ending in ${customer.card?.number?.slice(-4) ?? '????'}.`
              : `$${totalDiff.toFixed(2)} will be charged to the card ending in ${customer.card?.number?.slice(-4) ?? '????'}.`}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleConfirm} style={{ opacity: noChange ? 0.5 : 1 }}>
            {noChange ? 'No Change' : isDowngrade ? 'Confirm & Refund' : 'Confirm & Charge'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

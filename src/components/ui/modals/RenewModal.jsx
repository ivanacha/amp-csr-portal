import { useState } from 'react';
import { Btn } from '../Btn';
import { PLANS, PLAN_PRICE } from '../../../constants';

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

export default function RenewModal({ customer, vehicles, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onClose }) {
  const isCanceled = customer.status === 'canceled';
  const [selectedPlan, setSelectedPlan] = useState(isCanceled ? 'Basic' : customer.plan);

  const vehicleCount = isCanceled ? 1 : vehicles.length || 1;
  const price = PLAN_PRICE[selectedPlan] || 0;
  const total = price * vehicleCount;
  const countLabel = vehicleCount > 1 ? ` (×${vehicleCount})` : '';

  function handleConfirm() {
    const today = new Date();
    const renewDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    onUpdateCustomer({ status: 'active', plan: selectedPlan, renew: renewDate });
    if (!isCanceled) {
      onUpdateVehicles(vehicles.map((v) => ({ ...v, plan: selectedPlan })));
    }
    onAddTransaction({
      id: `t_${Date.now()}`,
      type: 'subscription',
      desc: `Subscription Renewal — ${selectedPlan}${countLabel}`,
      meta: `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · Manual renewal`,
      amount: `$${total.toFixed(2)}`,
      isCredit: false,
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
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)', marginBottom: 6 }}>
            Renew Subscription
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
            {isCanceled
              ? `${customer.firstName}'s account is canceled. Select a plan to reactivate their subscription.`
              : `${customer.firstName}'s subscription is overdue. Renewing will charge the outstanding balance immediately.`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            {isCanceled ? 'Select Plan' : 'Subscription Plan'}
          </div>
          <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} style={SELECT_STYLE}>
            {PLANS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        <div style={{
          background: 'var(--amp-light-blue)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{selectedPlan}{countLabel}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>
              {isCanceled ? 'New subscription' : 'Outstanding balance'}
            </div>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 600, color: 'var(--amp-navy)' }}>
            ${total.toFixed(2)}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
          This charge will be applied to the card on file ending in <strong>{customer.card?.number?.slice(-4) ?? '????'}</strong>. Next renewal will be set one month from today.
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleConfirm}>Confirm &amp; Charge</Btn>
        </div>
      </div>
    </div>
  );
}

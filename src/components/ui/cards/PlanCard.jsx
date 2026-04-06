/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Card component that displays the customer's active subscription plan, monthly charge, and renewal date, with a plan-change action.
 */

import { useState } from 'react';
import Card from '../Card';
import { Btn } from '../Btn';
import ChangePlanModal from '../modals/ChangePlanModal';
import { PLAN_PRICE } from '../../../constants';
import { formatRenewDate } from '../../../utils/formatters';

export default function PlanCard({ customer, vehicles, onUpdateCustomer, onUpdateVehicles, onAddTransaction }) {
  const [showChangePlan, setShowChangePlan] = useState(false);
  const isOverdue = customer.status === 'overdue';
  const isPaused = customer.status === 'paused';
  const isCanceled = customer.status === 'canceled';
  // Hide the change-plan button for statuses where plan changes are not allowed
  const showChangePlanBtn = !isCanceled && !isOverdue && !isPaused;
  const monthlyCharge = (PLAN_PRICE[customer.plan] || 0) * (vehicles.length || 0);

  return (
    <>
      <Card
        title="Subscription Plan"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>}
        actions={
          showChangePlanBtn && (
            <Btn variant="secondary" onClick={() => setShowChangePlan(true)}>Change Plan</Btn>
          )
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>Plan</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 400 }}>{customer.plan}</span>
              {!isCanceled && monthlyCharge > 0 && (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: 'var(--text-3)' }}>
                  ${monthlyCharge.toFixed(2)}/mo
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>Due Date</div>
            <div style={{ fontSize: 13.5, color: customer.renew ? (isOverdue ? 'var(--red)' : 'var(--text)') : 'var(--text-3)', fontWeight: 400 }}>
              {customer.renew ? formatRenewDate(customer.renew) : '—'}
            </div>
          </div>
        </div>
      </Card>
      {showChangePlan && (
        <ChangePlanModal
          customer={customer}
          vehicles={vehicles}
          onUpdateCustomer={onUpdateCustomer}
          onUpdateVehicles={onUpdateVehicles}
          onAddTransaction={onAddTransaction}
          onClose={() => setShowChangePlan(false)}
        />
      )}
    </>
  );
}

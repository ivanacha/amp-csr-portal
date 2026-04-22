/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Presentational component that renders the full customer profile layout including hero header, action buttons, and all detail cards.
 */

import { useState } from 'react';
import StatusBadge from '../StatusBadge';
import { Btn } from './Btn';
import AccountCard from './cards/AccountCard';
import PaymentCard from './cards/PaymentCard';
import PlanCard from './cards/PlanCard';
import VehicleCard from './cards/VehicleCard';
import PurchaseHistoryCard from './cards/PurchaseHistoryCard';
import ChangeStatusModal from './modals/ChangeStatusModal';
import RenewModal from './modals/RenewModal';
import CancelSubscriptionModal from './modals/CancelSubscriptionModal';
import { AVATAR_COLORS } from '../../data/mockData';
import { initials } from '../../utils/helpers';

export default function CustomerProfileView({
  customer,
  vehicles,
  transactions,
  onUpdateCustomer,
  onUpdateVehicles,
  onAddTransaction,
  onBack,
  isRenewable,
  showStatusModal,
  openStatusModal,
  closeStatusModal,
  showRenewModal,
  openRenewModal,
  closeRenewModal,
}) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isOverdue = customer.status === 'overdue';

  /** Cancels the subscription by clearing plan/vehicles and closing the confirmation modal. */
  function handleConfirmCancel() {
    onUpdateCustomer({ status: 'canceled', plan: '—', renew: null });
    onUpdateVehicles([]);
    setShowCancelModal(false);
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: 14 }}>
        <Btn variant="ghost" onClick={onBack}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Btn>
      </div>

      {/* Hero */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18,
        marginBottom: 20, boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: AVATAR_COLORS[customer.color],
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0,
          border: '2px solid var(--border)',
        }}>
          {initials(customer)}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 20, color: 'var(--text)' }}>
              {customer.firstName} {customer.lastName}
            </div>
            <StatusBadge status={customer.status} />
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {isOverdue && (
            <Btn variant="danger" onClick={() => setShowCancelModal(true)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Cancel Subscription
            </Btn>
          )}
          {isRenewable ? (
            <Btn variant="primary" onClick={openRenewModal}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
              Renew Subscription
            </Btn>
          ) : (
            <Btn variant="primary" onClick={openStatusModal}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              Change Status
            </Btn>
          )}
        </div>
      </div>

      {/* Modals */}
      {showRenewModal && (
        <RenewModal
          customer={customer}
          vehicles={vehicles}
          onUpdateCustomer={onUpdateCustomer}
          onUpdateVehicles={onUpdateVehicles}
          onAddTransaction={onAddTransaction}
          onClose={closeRenewModal}
        />
      )}
      {showStatusModal && (
        <ChangeStatusModal
          customer={customer}
          vehicles={vehicles}
          onUpdateCustomer={onUpdateCustomer}
          onUpdateVehicles={onUpdateVehicles}
          onAddTransaction={onAddTransaction}
          onClose={closeStatusModal}
        />
      )}
      {showCancelModal && (
        <CancelSubscriptionModal
          customer={customer}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <AccountCard customer={customer} onSave={onUpdateCustomer} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PaymentCard customer={customer} onSave={onUpdateCustomer} />
          <PlanCard
            customer={customer}
            vehicles={vehicles}
            onUpdateCustomer={onUpdateCustomer}
            onUpdateVehicles={onUpdateVehicles}
            onAddTransaction={onAddTransaction}
          />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <VehicleCard
            vehicles={vehicles}
            onUpdateVehicles={onUpdateVehicles}
            customerPlan={customer.plan}
            isCanceled={customer.status === 'canceled'}
          />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <PurchaseHistoryCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

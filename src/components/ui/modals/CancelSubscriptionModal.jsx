import React from 'react';
import { Btn } from '../Btn';

export default function CancelSubscriptionModal({ customer, onConfirm, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--red)', marginBottom: 6 }}>
            Cancel Subscription
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
            You are about to cancel <strong>{customer.firstName} {customer.lastName}</strong>'s subscription.
          </div>
        </div>

        <div style={{
          background: 'var(--red-bg)',
          border: '1px solid var(--red-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <div style={{ fontSize: 12.5, color: 'var(--red)', fontWeight: 600 }}>This action is permanent and cannot be undone:</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li style={{ fontSize: 12.5, color: 'var(--text-2)' }}>All vehicle subscriptions will be removed</li>
            <li style={{ fontSize: 12.5, color: 'var(--text-2)' }}>The account plan will be cleared</li>
            <li style={{ fontSize: 12.5, color: 'var(--text-2)' }}>The customer will lose access immediately</li>
          </ul>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
          To restore service later, use the <strong>Renew Subscription</strong> button on the customer profile.
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={onClose}>Keep Account</Btn>
          <Btn variant="danger" onClick={onConfirm}>Confirm Cancellation</Btn>
        </div>
      </div>
    </div>
  );
}

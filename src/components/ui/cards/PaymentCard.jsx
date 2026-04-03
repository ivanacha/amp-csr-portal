import React, { useState } from 'react';
import Card from '../Card';
import { Btn } from '../Btn';
import Field from '../Field';
import CardModal from '../modals/CardModal';

export default function PaymentCard({ customer, onSave }) {
  const [showModal, setShowModal] = useState(false);
  const { card } = customer;
  const last4 = card?.number ? card.number.slice(-4) : '????';
  const masked = `••••${last4}`;

  return (
    <>
      <Card
        title="Payment Method"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
        actions={<Btn variant="secondary" onClick={() => setShowModal(true)}>Update Card</Btn>}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Card Number" value={<span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{masked}</span>} />
          <Field label="Expiration"  value={card?.expiry} />
          <Field label="Name on Card" value={card?.name} />
          <Field label="Billing ZIP"  value={card?.zip} />
        </div>
      </Card>
      {showModal && (
        <CardModal
          card={card}
          onSave={(updated) => { onSave({ card: updated }); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

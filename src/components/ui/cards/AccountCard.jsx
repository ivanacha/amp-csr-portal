/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Card component for viewing and inline-editing a customer's account information (name, email, phone).
 */

import React, { useState } from 'react';
import Card from '../Card';
import { Btn } from '../Btn';
import Field from '../Field';
import { formatPhone } from '../../../utils/formatters';

export default function AccountCard({ customer, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: customer.firstName,
    lastName:  customer.lastName,
    email:     customer.email,
    phone:     customer.phone,
  });
  const [errors, setErrors] = useState({});

  // Reset form state and errors whenever the viewed customer changes
  React.useEffect(() => {
    setForm({
      firstName: customer.firstName,
      lastName:  customer.lastName,
      email:     customer.email,
      phone:     customer.phone,
    });
    setEditing(false);
    setErrors({});
  }, [customer.id]);

  /** Clears the error for a field as soon as the user starts typing in it. */
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  /** Discards unsaved changes and reverts form to the current customer values. */
  function handleCancel() {
    setEditing(false);
    setErrors({});
    setForm({
      firstName: customer.firstName,
      lastName:  customer.lastName,
      email:     customer.email,
      phone:     customer.phone,
    });
  }

  /** Validates all required fields; highlights missing ones in red and blocks save if any are empty. */
  function handleSave() {
    const required = ['firstName', 'lastName', 'email', 'phone'];
    const newErrors = {};
    required.forEach((key) => { if (!form[key].trim()) newErrors[key] = true; });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({ ...form, phone: formatPhone(form.phone) });
    setEditing(false);
    setErrors({});
  }

  return (
    <Card
      title="Account Information"
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
      actions={
        editing ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" onClick={handleCancel}>Cancel</Btn>
            <Btn variant="primary" onClick={handleSave}>Save Changes</Btn>
          </div>
        ) : (
          <Btn variant="secondary" onClick={() => setEditing(true)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </Btn>
        )
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="First Name" value={customer.firstName} editing={editing} error={!!errors.firstName} inputProps={{ value: form.firstName, onChange: set('firstName') }} />
        <Field label="Last Name"  value={customer.lastName}  editing={editing} error={!!errors.lastName}  inputProps={{ value: form.lastName,  onChange: set('lastName') }} />
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Email Address" value={customer.email} editing={editing} error={!!errors.email} inputProps={{ value: form.email, onChange: set('email'), type: 'email' }} />
        </div>
        <Field label="Phone" value={customer.phone} editing={editing} error={!!errors.phone} inputProps={{ value: form.phone, onChange: set('phone'), type: 'tel' }} />
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Account ID" value={<span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5 }}>{customer.id}</span>} editing={false} />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12.5, color: 'var(--red)' }}>
          Please fill in all required fields before saving.
        </div>
      )}
    </Card>
  );
}

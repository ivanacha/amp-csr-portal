import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { AVATAR_COLORS, formatRenewDate } from '../data/mockData';

const PLANS = ['Basic', 'Premium', 'Unlimited Pro'];

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatPlate(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const letters = clean.replace(/[^A-Z]/g, '').slice(0, 3);
  const digits = clean.replace(/[^0-9]/g, '').slice(0, 4);
  if (!letters && !digits) return raw;
  return `${letters}-${digits}`;
}

function initials(c) {
  return (c.firstName[0] + c.lastName[0]).toUpperCase();
}

/* ── Shared card shell ──────────────────────────────────────────────────── */
function Card({ title, icon, actions, children }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface-2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13.5, color: 'var(--amp-navy)' }}>
          {icon}
          {title}
        </div>
        {actions}
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────── */
function Btn({ onClick, variant = 'secondary', children, style: extra }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '6px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 12.5, fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.15s',
    border: '1px solid transparent',
    ...extra,
  };
  const variants = {
    primary: { background: 'var(--amp-cobalt)', color: '#fff', borderColor: 'var(--amp-cobalt)' },
    secondary: { background: '#fff', color: 'var(--amp-cobalt)', borderColor: 'var(--border)' },
    ghost: { background: 'transparent', color: 'var(--text-2)', borderColor: 'var(--border)' },
    danger: { background: '#fff', color: 'var(--red)', borderColor: 'var(--red-border)' },
  };
  return <button style={{ ...base, ...variants[variant] }} onClick={onClick}>{children}</button>;
}

/* ── Icon button ──────────────────────────────────────────────────────── */
function IconBtn({ onClick, title, danger, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 30, height: 30,
        borderRadius: 7,
        border: `1px solid ${danger ? 'var(--red-border)' : 'var(--border)'}`,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: danger ? 'var(--red)' : 'var(--text-2)',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

/* ── Field ────────────────────────────────────────────────────────────── */
function Field({ label, value, editing, inputProps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>
        {label}
      </div>
      {editing ? (
        <input
          style={{
            background: 'var(--surface-2)',
            border: '1.5px solid var(--amp-sky)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 10px',
            fontSize: 13.5,
            color: 'var(--text)',
            outline: 'none',
            width: '100%',
          }}
          {...inputProps}
        />
      ) : (
        <div style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 400 }}>{value}</div>
      )}
    </div>
  );
}

/* ── Account Info Card ────────────────────────────────────────────────── */
function AccountCard({ customer, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    plan: customer.plan,
  });

  // Keep form in sync if customer prop changes (e.g. navigating between profiles)
  React.useEffect(() => {
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      plan: customer.plan,
    });
    setEditing(false);
  }, [customer.id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleCancel() {
    setEditing(false);
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      plan: customer.plan,
    });
  }

  function handleSave() {
    onSave({ ...form, phone: formatPhone(form.phone) });
    setEditing(false);
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
        <Field label="First Name" value={customer.firstName} editing={editing} inputProps={{ value: form.firstName, onChange: set('firstName') }} />
        <Field label="Last Name" value={customer.lastName} editing={editing} inputProps={{ value: form.lastName, onChange: set('lastName') }} />
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Email Address" value={customer.email} editing={editing} inputProps={{ value: form.email, onChange: set('email'), type: 'email' }} />
        </div>
        <Field label="Phone" value={customer.phone} editing={editing} inputProps={{ value: form.phone, onChange: set('phone'), type: 'tel' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>Plan</div>
          {editing ? (
            <select
              value={form.plan}
              onChange={set('plan')}
              style={{
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
              }}
            >
              {PLANS.map((p) => <option key={p}>{p}</option>)}
            </select>
          ) : (
            <div style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 400 }}>{customer.plan}</div>
          )}
        </div>
        <Field label="Account ID" value={<span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5 }}>{customer.id}</span>} editing={false} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-3)' }}>Next Renewal</div>
          <div style={{ fontSize: 13.5, color: customer.renew ? (customer.renew < new Date() ? 'var(--red)' : 'var(--text)') : 'var(--text-3)', fontWeight: 400 }}>
            {customer.renew ? formatRenewDate(customer.renew) : '—'}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── Vehicle Edit Modal ───────────────────────────────────────────────── */
function VehicleModal({ vehicle, onSave, onClose }) {
  const [form, setForm] = useState({
    plate: vehicle?.plate ?? '',
    year: vehicle?.year ?? '',
    make: vehicle?.make ?? '',
    model: vehicle?.model ?? '',
    color: vehicle?.color ?? '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSave() {
    onSave({
      plate: formatPlate(form.plate),
      year: form.year ? parseInt(form.year, 10) : '',
      make: form.make,
      model: form.model,
      color: form.color,
    });
  }

  const inputStyle = {
    background: 'var(--surface-2)',
    border: '1.5px solid var(--amp-sky)',
    borderRadius: 'var(--radius-sm)',
    padding: '7px 10px',
    fontSize: 13.5,
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
  };

  const labelStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    marginBottom: 5,
    display: 'block',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(15,36,71,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        padding: 28,
        width: 420,
        display: 'flex', flexDirection: 'column', gap: 16,
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)' }}>
          {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle}>License Plate</label>
          <input style={inputStyle} value={form.plate} onChange={set('plate')} placeholder="e.g. ABC-1234" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Year</label>
            <input style={inputStyle} value={form.year} onChange={set('year')} placeholder="e.g. 2022" type="number" min="1980" max="2030" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Make</label>
            <input style={inputStyle} value={form.make} onChange={set('make')} placeholder="e.g. Honda" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Model</label>
            <input style={inputStyle} value={form.model} onChange={set('model')} placeholder="e.g. Civic" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Color</label>
            <input style={inputStyle} value={form.color} onChange={set('color')} placeholder="e.g. Blue" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave}>
            {vehicle ? 'Save Changes' : 'Add Vehicle'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Vehicle Subscriptions Card ───────────────────────────────────────── */
function VehicleCard({ vehicles, onUpdateVehicles, customerPlan, isCancelled }) {
  const [editingVehicle, setEditingVehicle] = useState(null); // vehicle object or null
  const [showAddModal, setShowAddModal] = useState(false);

  function handleSaveEdit(form) {
    onUpdateVehicles(
      vehicles.map((v) => (v.id === editingVehicle.id ? { ...v, ...form } : v))
    );
    setEditingVehicle(null);
  }

  function handleAdd(form) {
    const newVehicle = {
      id: `v_${Date.now()}`,
      plan: customerPlan,
      ...form,
    };
    onUpdateVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
  }

  function handleRemove(vehicleId) {
    const v = vehicles.find((x) => x.id === vehicleId);
    const label = v ? `${v.plate} (${v.year} ${v.make} ${v.model})` : 'this vehicle';
    if (!window.confirm(`Remove ${label} from this account?\n\nThis action cannot be undone.`)) return;
    onUpdateVehicles(vehicles.filter((x) => x.id !== vehicleId));
  }

  return (
    <>
      <Card
        title={`Vehicle Subscriptions (${vehicles.length})`}
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
        actions={
          !isCancelled && (
            <Btn variant="primary" onClick={() => setShowAddModal(true)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add Vehicle
            </Btn>
          )
        }
      >
        {vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-3)', fontSize: 13.5 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 10, opacity: 0.4, display: 'block', margin: '0 auto 10px' }}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            No active vehicle subscriptions
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {vehicles.map((v) => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: 'var(--amp-light-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amp-cobalt)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 500, letterSpacing: 1, color: 'var(--amp-navy)' }}>{v.plate}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{v.year} {v.make} {v.model} · {v.color}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: v.isPaused ? 'var(--yellow)' : 'var(--green)' }}>{v.plan}</div>
                  {v.isPaused && (
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>⏸ Paused</div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <IconBtn title="Edit vehicle" onClick={() => setEditingVehicle(v)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </IconBtn>
                  <IconBtn title="Remove vehicle" danger onClick={() => handleRemove(v.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                  </IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>


      {editingVehicle && (
        <VehicleModal
          vehicle={editingVehicle}
          onSave={handleSaveEdit}
          onClose={() => setEditingVehicle(null)}
        />
      )}
      {showAddModal && (
        <VehicleModal
          vehicle={null}
          onSave={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}

/* ── Card Edit Modal ──────────────────────────────────────────────────── */
function CardModal({ card, onSave, onClose }) {
  const [form, setForm] = useState({
    number: card?.number ?? '',
    name: card?.name ?? '',
    expiry: card?.expiry ?? '',
    csc: card?.csc ?? '',
    zip: card?.zip ?? '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const inputStyle = {
    background: 'var(--surface-2)',
    border: '1.5px solid var(--amp-sky)',
    borderRadius: 'var(--radius-sm)',
    padding: '7px 10px',
    fontSize: 13.5,
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
  };

  const labelStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    marginBottom: 5,
    display: 'block',
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)' }}>
          Update Payment Method
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle}>Card Number</label>
          <input style={inputStyle} value={form.number} onChange={set('number')} placeholder="1234 5678 9012 3456" maxLength={16} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle}>Name on Card</label>
          <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Full name as on card" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Expiration</label>
            <input style={inputStyle} value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" maxLength={5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>Security Code</label>
            <input style={inputStyle} value={form.csc} onChange={set('csc')} placeholder="CSC" maxLength={4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>ZIP Code</label>
            <input style={inputStyle} value={form.zip} onChange={set('zip')} placeholder="ZIP" maxLength={10} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(form)}>Save Card</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Payment Method Card ──────────────────────────────────────────────── */
function PaymentCard({ customer, onSave }) {
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
          <div style={{ gridColumn: '1/-1' }}>
            <Field label="Card Number" value={<span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{masked}</span>} />
          </div>
          <Field label="Name on Card" value={card?.name} />
          <Field label="Expiration" value={card?.expiry} />
          <Field label="Billing ZIP" value={card?.zip} />
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

/* ── Purchase History Card ────────────────────────────────────────────── */
const TX_ICONS = {
  subscription: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  wash: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>,
  refund: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>,
  coupon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
};

const TX_STYLE = {
  subscription: { bg: 'var(--amp-light-blue)', color: 'var(--amp-cobalt)' },
  wash: { bg: 'var(--green-bg)', color: 'var(--green)' },
  refund: { bg: 'var(--red-bg)', color: 'var(--red)' },
  coupon: { bg: 'var(--yellow-bg)', color: 'var(--yellow)' },
};

function PurchaseHistoryCard({ transactions }) {
  const totalSpent = transactions.filter((t) => !t.isCredit && t.accepted === true).reduce((sum, t) => {
    const n = parseFloat(t.amount.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <Card
      title="Purchase History (Last 90 days)"
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
      actions={
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
          Total | ${totalSpent.toFixed(2)}
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
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: ts.bg, color: ts.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
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

/* ── Change Status Modal ──────────────────────────────────────────────── */
const PLAN_PRICE = { Basic: 14.99, Premium: 29.99, 'Unlimited Pro': 29.99 };

const STATUS_OPTIONS = [
  { value: 'active',    label: 'Active',    color: 'var(--green)',  bg: 'var(--green-bg)' },
  { value: 'paused',    label: 'Paused',    color: 'var(--yellow)', bg: 'var(--yellow-bg)' },
  { value: 'cancelled', label: 'Cancelled', color: 'var(--red)',    bg: 'var(--red-bg)' },
];

function getStatusDescription(optValue, effectiveStatus) {
  if (optValue === 'active') {
    if (effectiveStatus === 'paused') return `Reactivates account — subscription fee charged immediately, renewal set to today`;
    return 'Account is active and in good standing';
  }
  if (optValue === 'paused') {
    if (effectiveStatus === 'paused') return 'Subscription & wash access currently suspended';
    return 'Immediately suspends subscription renewals and single wash purchases';
  }
  if (optValue === 'cancelled') {
    if (effectiveStatus === 'cancelled') return 'Account is permanently closed';
    return 'Permanently clears all vehicle subscriptions — this action is irreversible';
  }
}

function ChangeStatusModal({ customer, vehicles, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onClose }) {
  const [pendingStatus, setPendingStatus] = useState(null);
  const isCancelled = customer.status === 'cancelled';
  const effectiveStatus = customer.status === 'overdue' ? 'active' : customer.status;

  function handleSelect(optValue) {
    if (optValue === effectiveStatus || isCancelled) return;
    setPendingStatus(pendingStatus === optValue ? null : optValue);
  }

  function handleConfirm() {
    if (!pendingStatus) return;
    const today = new Date();

    if (pendingStatus === 'paused') {
      onUpdateCustomer({ status: 'paused', renew: null });
      onUpdateVehicles(vehicles.map((v) => ({ ...v, isPaused: true })));
    } else if (pendingStatus === 'cancelled') {
      onUpdateCustomer({ status: 'cancelled', plan: '—', renew: null });
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
          <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)', marginBottom: 6 }}>
            Change Account Status
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
            {isCancelled
              ? 'Cancelled accounts cannot have their status changed.'
              : 'Select a new status, then confirm to apply immediately.'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STATUS_OPTIONS.map((opt) => {
            const isCurrent = opt.value === effectiveStatus;
            const isPending = pendingStatus === opt.value;
            const isDisabled = isCancelled && !isCurrent;
            const isSelectable = !isCurrent && !isDisabled;

            return (
              <div key={opt.value} style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
                {/* Status option */}
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

                {/* Slide-in confirm button */}
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

/* ── Main CustomerProfile ─────────────────────────────────────────────── */
export default function CustomerProfile({ customer, vehicles, transactions, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onBack }) {
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Back button row */}
      <div style={{ marginBottom: 14 }}>
        <Btn variant="ghost" onClick={onBack}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Btn>
      </div>

      {/* Hero */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '22px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 20,
        boxShadow: 'var(--shadow-sm)',
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
        <div style={{ marginLeft: 'auto' }}>
          <Btn variant="secondary" onClick={() => setShowStatusModal(true)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Change Status
          </Btn>
        </div>
      </div>

      {showStatusModal && (
        <ChangeStatusModal
          customer={customer}
          vehicles={vehicles}
          onUpdateCustomer={onUpdateCustomer}
          onUpdateVehicles={onUpdateVehicles}
          onAddTransaction={onAddTransaction}
          onClose={() => setShowStatusModal(false)}
        />
      )}

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <AccountCard customer={customer} onSave={onUpdateCustomer} />
        <PaymentCard customer={customer} onSave={onUpdateCustomer} />
        <div style={{ gridColumn: '1/-1' }}>
          <VehicleCard vehicles={vehicles} onUpdateVehicles={onUpdateVehicles} customerPlan={customer.plan} isCancelled={customer.status === 'cancelled'} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <PurchaseHistoryCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

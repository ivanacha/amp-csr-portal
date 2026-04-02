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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13.5, color: 'var(--amp-navy)' }}>
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
function VehicleCard({ vehicles, onUpdateVehicles, customerPlan }) {
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
        title="Vehicle Subscriptions"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
        actions={
          <Btn variant="primary" onClick={() => setShowAddModal(true)}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add Vehicle
          </Btn>
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

/* ── Payment Method Card ──────────────────────────────────────────────── */
function PaymentCard({ customer }) {
  return (
    <Card
      title="Payment Method"
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
      actions={<Btn variant="secondary">Update Card</Btn>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Card on File" value={customer.card} />
        </div>
        <Field label="Expires" value={customer.expiry} />
        <Field label="Billing ZIP" value={customer.zip} />
      </div>
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 9,
        marginTop: 16, padding: '10px 13px',
        background: 'var(--yellow-bg)',
        border: '1px solid var(--yellow-border)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 12.5, color: 'var(--yellow)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Card details are tokenized. Direct customers to update via the AMP app for security.
      </div>
    </Card>
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
  return (
    <Card
      title="Purchase History"
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
      actions={
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.5px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px' }}>
          Last 90 days
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

/* ── Main CustomerProfile ─────────────────────────────────────────────── */
export default function CustomerProfile({ customer, vehicles, transactions, onUpdateCustomer, onUpdateVehicles, onBack }) {
  const totalSpent = transactions.filter((t) => !t.isCredit).reduce((sum, t) => {
    const n = parseFloat(t.amount.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const stats = [
    { val: vehicles.length, label: 'Vehicle(s)' },
    { val: transactions.length, label: 'Transaction(s)' },
    { val: `$${totalSpent.toFixed(2)}`, label: '90-Day Spend' },
  ];

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
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--amp-navy)' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <AccountCard customer={customer} onSave={onUpdateCustomer} />
        <PaymentCard customer={customer} />
        <div style={{ gridColumn: '1/-1' }}>
          <VehicleCard vehicles={vehicles} onUpdateVehicles={onUpdateVehicles} customerPlan={customer.plan} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <PurchaseHistoryCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

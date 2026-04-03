import React, { useState } from 'react';
import { Btn } from '../Btn';
import { formatPlate } from '../../../utils/formatters';

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

export default function VehicleModal({ vehicle, onSave, onClose }) {
  const [form, setForm] = useState({
    plate: vehicle?.plate ?? '',
    year:  vehicle?.year  ?? '',
    make:  vehicle?.make  ?? '',
    model: vehicle?.model ?? '',
    color: vehicle?.color ?? '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSave() {
    onSave({
      plate: formatPlate(form.plate),
      year:  form.year ? parseInt(form.year, 10) : '',
      make:  form.make,
      model: form.model,
      color: form.color,
    });
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
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
          <Btn variant="primary" onClick={handleSave}>Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}

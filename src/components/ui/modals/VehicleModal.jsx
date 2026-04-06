/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Modal form for adding or editing a vehicle's plate, year, make, model, and color on a customer account.
 */

import { useState } from 'react';
import { Btn } from '../Btn';
import { formatPlate } from '../../../utils/formatters';

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  marginBottom: 5,
  display: 'block',
};

/** Returns the input border style, switching to red when the field has a validation error. */
function inputStyle(error) {
  return {
    background: 'var(--surface-2)',
    border: `1.5px solid ${error ? 'var(--red)' : 'var(--amp-sky)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '7px 10px',
    fontSize: 13.5,
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
  };
}

export default function VehicleModal({ vehicle, onSave, onClose }) {
  const [form, setForm] = useState({
    plate: vehicle?.plate ?? '',
    year:  vehicle?.year  ?? '',
    make:  vehicle?.make  ?? '',
    model: vehicle?.model ?? '',
    color: vehicle?.color ?? '',
  });
  const [errors, setErrors] = useState({});

  /** Clears the error for a field as soon as the user starts typing in it. */
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  /** Validates all required fields; highlights missing ones in red and blocks save if any are empty. */
  function handleSave() {
    const required = ['plate', 'year', 'make', 'model', 'color'];
    const newErrors = {};
    required.forEach((key) => { if (!String(form[key]).trim()) newErrors[key] = true; });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({
      plate: formatPlate(form.plate),
      year:  parseInt(form.year, 10),
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
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--amp-navy)' }}>
          {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ ...labelStyle, color: errors.plate ? 'var(--red)' : 'var(--text-3)' }}>License Plate</label>
          <input style={inputStyle(errors.plate)} value={form.plate} onChange={set('plate')} placeholder="e.g. ABC-1234" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.year ? 'var(--red)' : 'var(--text-3)' }}>Year</label>
            <input style={inputStyle(errors.year)} value={form.year} onChange={set('year')} placeholder="e.g. 2022" type="number" min="1980" max="2030" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.make ? 'var(--red)' : 'var(--text-3)' }}>Make</label>
            <input style={inputStyle(errors.make)} value={form.make} onChange={set('make')} placeholder="e.g. Honda" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.model ? 'var(--red)' : 'var(--text-3)' }}>Model</label>
            <input style={inputStyle(errors.model)} value={form.model} onChange={set('model')} placeholder="e.g. Civic" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ ...labelStyle, color: errors.color ? 'var(--red)' : 'var(--text-3)' }}>Color</label>
            <input style={inputStyle(errors.color)} value={form.color} onChange={set('color')} placeholder="e.g. Blue" />
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div style={{ fontSize: 12.5, color: 'var(--red)', marginTop: -4 }}>
            Please fill in all required fields before saving.
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave}>Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}
